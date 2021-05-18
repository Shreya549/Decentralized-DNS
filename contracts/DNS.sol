// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract DNS{
    uint256 constant priceForOneByteForOneSecond = 0.016 ether; // ~1B dollar a year
    uint256 constant priceFactor = 5; // divide by this for every additional byte
    uint256 constant minimumNumberOfSeconds = 10 days;
    uint256 constant maximumNumberOfSeconds = 365 days;

    enum AddressType {Simple, Custom}

    struct DNSEntry {
        string domainName;
        uint256 reservationEndTime;
        address payable owner;
        uint256 deposit;
        AddressType addressType;
        string domainAddress;
        string domainAlias;
    }

    mapping(string => DNSEntry) entries;
    mapping(address => uint256) public pendingDepositReturns;
    
    event reservedTime(uint256 reservationTime);
    function calculateReservationTime(string memory domainName, uint256 paymentAmount) public returns (uint256) {
        uint256 priceForSecond = priceForOneByteForOneSecond / (priceFactor ** bytes(domainName).length);
        uint256 reservationTime = paymentAmount / priceForSecond;
        emit reservedTime(reservationTime);
        return (reservationTime);
    }

    event isReserved(bool state);
    function isDomainNameReserved(string memory domainName) public returns (bool) {
        bool state = block.timestamp < entries[domainName].reservationEndTime;
        emit isReserved(state);
        return (state);
    }

    event isReservedSender(bool state);
    function isDomainNameReservedBySender(string memory domainName) public returns (bool) {
        bool state = isDomainNameReserved(domainName) && entries[domainName].owner == msg.sender;
        emit isReservedSender(state);
        
        return (state);
    }

    
    function reserveDomainName(string calldata domainName) external payable returns (uint){
        require(!isDomainNameReserved(domainName), "Domain name is already reserved.");
        releaseDomainName(domainName);

        uint256 reservationTime = calculateReservationTime(domainName, msg.value);
        require(reservationTime >= minimumNumberOfSeconds, "The payment is lower than expected");
        require(reservationTime <= maximumNumberOfSeconds, "The payment is higher than expected");

        entries[domainName].domainName = domainName;
        entries[domainName].reservationEndTime = block.timestamp + reservationTime;
        entries[domainName].owner = msg.sender;
        entries[domainName].deposit += msg.value;
        emit reservedTime(reservationTime);
        return reservationTime;
    }

    function extendDomainNameReservation(string calldata domainName) external payable {
        require(isDomainNameReservedBySender(domainName), "Domain name has to be reserved by the sender");

        uint256 remainingReservationTime = entries[domainName].reservationEndTime - block.timestamp;
        uint256 addedReservationTime = calculateReservationTime(domainName, msg.value);
        uint256 totalReservationTime = remainingReservationTime + addedReservationTime;
        require(totalReservationTime >= minimumNumberOfSeconds, "The payment is lower than expected");
        require(totalReservationTime <= maximumNumberOfSeconds, "The payment is higher than expected");

        entries[domainName].reservationEndTime = totalReservationTime;
        entries[domainName].deposit += msg.value;
    }

    function releaseDomainName(string memory domainName) public {
        require(entries[domainName].owner == msg.sender || !isDomainNameReserved(domainName), "Domain name has to be reserved by the sender or expired");

        pendingDepositReturns[entries[domainName].owner] += entries[domainName].deposit;
        delete entries[domainName];
    }

    event returned(bool state);
    function pullDeposit() external returns (bool) {
        uint256 amount = pendingDepositReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `send` returns.
            pendingDepositReturns[msg.sender] = 0;

            if (!msg.sender.send(amount)) {
                // No need to call throw here, just reset the amount owing
                pendingDepositReturns[msg.sender] = amount;
                emit returned(false);
                return false;
            }
        }
        emit returned(true);
        return true;
    }

    function setDomainAddress(string calldata domainName, string calldata domainAddress) external {
        require(isDomainNameReservedBySender(domainName), "Domain name has to be reserved by the sender");

        entries[domainName].addressType = AddressType.Simple;
        entries[domainName].domainAddress = domainAddress;
        entries[domainName].domainAlias = "";
    }

    function setCustomDomainAddress(string calldata domainName, string calldata domainAlias) external {
        require(isDomainNameReservedBySender(domainName) && isDomainNameReservedBySender(domainAlias), "Domain names have to be reserved by the sender");
        

        entries[domainName].addressType = AddressType.Custom;
        entries[domainName].domainAddress = "";
        entries[domainName].domainAlias = domainAlias;

    }

    event domainAddress(string domAdd);
    function getDomainAddress(string calldata domainName) external returns (string memory) {
        require(isDomainNameReserved(domainName), "Domain name is not reserved");

        if (entries[domainName].addressType == AddressType.Simple) {
            emit domainAddress(entries[domainName].domainAddress);
            return entries[domainName].domainAddress;
        }
        else {
            string memory domainAlias = entries[domainName].domainAlias;
            while(entries[domainAlias].addressType == AddressType.Custom){
                domainAlias = entries[domainAlias].domainAlias;
            }
            emit domainAddress(entries[domainAlias].domainAddress);
            return entries[domainAlias].domainAddress;
        }
    }
    
}