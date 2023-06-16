// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;


/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

// File: @openzeppelin/contracts/token/ERC20/ERC20.sol


// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;




/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

// File: contracts/FilaDoge.sol


pragma solidity ^0.8.18;


/// @title FilaDoge, the first open-source peer-to-peer digital meme-token on Filecoin Virtual Machine (FEVM)
/// @author FilaDoge Dev
contract FilaDoge is ERC20 {
    uint private _airDrop2Released;
    uint private _hasRewardedInviters;
    uint private _hasRewardedInviteeAmount;
    uint private _lotteryReleasedAmount;
    uint private _lotteryStartTime;
    address private _owner;
    address[] private _invitees;
    address[] private _inviters;
    address[] private _gamblers;
    mapping(address => bool) private _hasBeenInvited;
    mapping(address => bool) private _hasGambled;
    mapping(address => uint) private _inviterRewards;
    mapping(address => uint) private _inviteeRewards;
    mapping(address => uint) private _gamblerRewards;

    //Token basics
    uint constant MAX_SUPPLY = 10 ** 12;
    uint constant RATIO_BASE = 10 ** 8;

    //InitialMint, 30%
    uint constant DONATION_COOP_POOL = MAX_SUPPLY * 1 / 5;
    uint constant FUTURE_EVENT_POOL = MAX_SUPPLY * 1 / 10;

    //Token airdrop 1, 6%
    uint constant AIRDROP_1_REWARD_PART_1 = 1 * MAX_SUPPLY / 200;
    uint constant AIRDROP_1_REWARD_PART_2 = 11 * MAX_SUPPLY / 200;

    //Token airdrop 2, 4%
    uint constant AIRDROP_2_SIZE = AIRDROP_2_TIER_4;
    uint constant AIRDROP_2_TIER_0 = 1;
    uint constant AIRDROP_2_TIER_0_REWARD = 440000 * MAX_SUPPLY / RATIO_BASE;
    uint constant AIRDROP_2_TIER_1 = 11;
    uint constant AIRDROP_2_TIER_1_REWARD = 32000 * MAX_SUPPLY / RATIO_BASE;
    uint constant AIRDROP_2_TIER_2 = 101;
    uint constant AIRDROP_2_TIER_2_REWARD = 16000 * MAX_SUPPLY / RATIO_BASE;
    uint constant AIRDROP_2_TIER_3 = 251;
    uint constant AIRDROP_2_TIER_3_REWARD = 8000 * MAX_SUPPLY / RATIO_BASE;
    uint constant AIRDROP_2_TIER_4 = 401;
    uint constant AIRDROP_2_TIER_4_REWARD = 4000 * MAX_SUPPLY / RATIO_BASE;

    //Inviter, 20%
    uint constant INVITER_REWARD = 40 * MAX_SUPPLY / RATIO_BASE;
    uint constant MAX_INVITATION = 500000;

    //Invitee, 20%
    uint constant INVITEE_REWARD_FACTOR_A = 50867653407 * MAX_SUPPLY / 10 ** 12;
    uint constant INVITEE_REWARD_FACTOR_B = 10000;

    //Lottery, 20%
    uint constant MIN_LOTTERY_REWARD = 1 * MAX_SUPPLY / RATIO_BASE;
    uint constant MAX_LOTTERY_REWARD = 100 * MAX_SUPPLY / RATIO_BASE;
    uint constant LOTTERY_POOL = MAX_SUPPLY / 5;

    struct ValuePair {
        address account;
        uint amount;
    }

    /**
     * @dev Sets the variables of token upon construction.
     *
     * Among these variables, `donation_coop_pool` stores tokens reserved for charity,
     * donation and collaborations, and `future_event_pool` stores tokens reserved for
     * future games and activities. `initialLotteryStartTime` indicates the timestamp
     * when lottery will be started.
     */
    constructor(
        string memory name,
        string memory symbol,
        address donation_coop_pool,
        address future_event_pool,
        uint initialLotteryStartTime
    ) ERC20(name, symbol) {
        _owner = _msgSender();
        _lotteryStartTime = initialLotteryStartTime;
        _mint(donation_coop_pool, _withDecimal(DONATION_COOP_POOL));
        _mint(future_event_pool, _withDecimal(FUTURE_EVENT_POOL));
    }

    /**
     * @dev First airdrop, rewards top 600 FIL holders* with 6% of the total supply.
     *
     * Due to limited knowledge of top FIL holders’ 0x or f4 addresses, this part of
     * airdrop will be allocated to the Protocol Lab as a lump sum and to be
     * re-distributed to FIL holders in the future.
     */
    function airDrop1 (address receiver1, address receiver2) onlyOwner external {
        _mint(receiver1, _withDecimal(AIRDROP_1_REWARD_PART_1));
        _mint(receiver2, _withDecimal(AIRDROP_1_REWARD_PART_2));
    }

    /**
     * @dev Second airdrop is for Vitalik and top 400 Eth holders (recorded from
     * etherscan.io at Mar. 14 2023 - 2:00AM UTC), with 4% of the total supply.
     */
    function airDrop2 (address[] memory receiverList) onlyOwner external returns (uint) {
        uint initial = _airDrop2Released;
        require (initial < AIRDROP_2_SIZE, "Has already accomplished before.");
        uint len = receiverList.length;
        require (initial + len <= AIRDROP_2_SIZE, "Invalid input address list length.");
        uint p = initial;
        for (; p < AIRDROP_2_TIER_0 && p - initial < len; p++) {
            _mint(receiverList[p - initial], _withDecimal(AIRDROP_2_TIER_0_REWARD));
        }
        for (; p < AIRDROP_2_TIER_1 && p - initial < len; p++) {
            _mint(receiverList[p - initial], _withDecimal(AIRDROP_2_TIER_1_REWARD));
        }
        for (; p < AIRDROP_2_TIER_2 && p - initial < len; p++) {
            _mint(receiverList[p - initial], _withDecimal(AIRDROP_2_TIER_2_REWARD));
        }
        for (; p < AIRDROP_2_TIER_3 && p - initial < len; p++) {
            _mint(receiverList[p - initial], _withDecimal(AIRDROP_2_TIER_3_REWARD));
        }
        for (; p < AIRDROP_2_TIER_4 && p - initial < len; p++) {
            _mint(receiverList[p - initial], _withDecimal(AIRDROP_2_TIER_4_REWARD));
        }
        _airDrop2Released = p;
        return p;
    }

    /**
     * @dev Mint tokens for `inviter` and `invitee` correspondingly.
     *
     * Early invitees will be able to mint their amount of FilaDoge token (FLD) from 20%
     * of total supply by filling in their f4 address. An f4 address converter will be
     * provided on the website to convert 0x addresses. The relationship between the FLD
     * token amount and the order of claim is described by the following mathematical model,
     * with the maximum of 500,000 addresses. The actual amount of FLD token received will
     * be integer as the decimal points will be rounded down.
     */
    function mint(
        address inviter,
        address invitee
    ) external returns (
        uint inviterReward,
        uint inviteeReward
    ) {
        require(_invitees.length < MAX_INVITATION, "Invitee pool has been exhausted.");
        require(inviter != invitee, "Inviter and your address cannot be the same one.");
        require(!_hasBeenInvited[invitee], "Your address has already been invited.");

        _hasBeenInvited[invitee] = true;
        _invitees.push(invitee);
        inviterReward = _rewardInviter(inviter);
        uint inviteeGrossReward = _inviteeReward(_invitees.length);
        _hasRewardedInviteeAmount += inviteeGrossReward;
        _inviteeRewards[invitee] = inviteeGrossReward;
        inviteeReward = _withDecimal(inviteeGrossReward);
        _mint(invitee, inviteeReward);
    }

    /**
     * @dev Participate lottery to win tokens for `invitee` and reward `inviter`.
     *
     * Users may participant in a lottery game by filling in their f4 address and claim
     * any random amount from 10,000 to 1,000,000 $FLD. The lottery game is concluded
     * as soon as 20% of total supply is drained up.
     */
    function lottery(
        address inviter,
        address gambler
    ) afterLotteryStartTime external returns (
        uint inviterReward,
        uint gamblerReward
    ) {
        require(_lotteryReleasedAmount < LOTTERY_POOL, "Lottery pool has been exhausted.");
        require(inviter != gambler, "Inviter and your address cannot be the same one.");
        require(!_hasGambled[gambler], "Your address has already gambled.");

        _hasGambled[gambler] = true;
        _gamblers.push(gambler);
        inviterReward = _rewardInviter(inviter);
        uint grossReward = _getRandom(gambler) % (MAX_LOTTERY_REWARD - MIN_LOTTERY_REWARD + 1) + MIN_LOTTERY_REWARD;
        if (_lotteryReleasedAmount + grossReward > LOTTERY_POOL) {
            grossReward = LOTTERY_POOL - _lotteryReleasedAmount;
        }
        _lotteryReleasedAmount += grossReward;
        _gamblerRewards[gambler] = grossReward;
        gamblerReward = _withDecimal(grossReward);
        _mint(gambler, gamblerReward);
    }

    /**
     * @dev Returns next invitee's reward.
     */
    function nextInviteeReward() external view returns (uint) {
        if (_invitees.length == MAX_INVITATION) return 0;
        return _withDecimal(_inviteeReward(_invitees.length + 1));
    }

    /**
     * @dev Returns inviters' addresses as well as rewards received correspondingly.
     */
    function hasRewardedInviterList() external view returns (ValuePair[] memory result) {
        result = new ValuePair[](_inviters.length); 
        for (uint i = 0; i < _inviters.length; i++) {
            address inviter = _inviters[i];
            result[i].account = inviter;
            result[i].amount = _withDecimal(_inviterRewards[inviter]);
        }
    }

    /**
     * @dev Returns invitees' addresses as well as rewards received correspondingly.
     */
    function hasRewardedInviteeList() external view returns (ValuePair[] memory result) {
        result = new ValuePair[](_invitees.length); 
        for (uint i = 0; i < _invitees.length; i++) {
            address invitee = _invitees[i];
            result[i].account = invitee;
            result[i].amount = _withDecimal(_inviteeRewards[invitee]);
        }
    }

    /**
     * @dev Returns gamblers' addresses as well as rewards received correspondingly.
     */
    function hasRewardedGamblerList() external view returns (ValuePair[] memory result) {
        result = new ValuePair[](_gamblers.length); 
        for (uint i = 0; i < _gamblers.length; i++) {
            address gambler = _gamblers[i];
            result[i].account = gambler;
            result[i].amount = _withDecimal(_gamblerRewards[gambler]);
        }
    }

    /**
     * @dev Returns currently released uints of inviter reward.
     */
    function hasRewardedInviters() external view returns (uint) {
        return _hasRewardedInviters;
    }

    /**
     * @dev Returns whether `invitee` has been invited.
     */
    function hasBeenInvited(address invitee) external view returns (bool) {
        return _hasBeenInvited[invitee];
    }

    /**
     * @dev Returns whether `gambler` has taken part in lottery game.
     */
    function hasGambled(address gambler) external view returns (bool) {
        return _hasGambled[gambler];
    }

    /**
     * @dev Returns currently released inviter reward amount in total.
     */
    function hasRewardedInviterAmount() external view returns (uint) {
        return _withDecimal(_hasRewardedInviters * INVITER_REWARD);
    }

    /**
     * @dev Returns currently released invitee reward amount in total.
     */
    function hasRewardedInviteeAmount() external view returns (uint) {
        return _withDecimal(_hasRewardedInviteeAmount);
    }

    /**
     * @dev Returns current number of invitees.
     */
    function hasRewardedInvitees() external view returns (uint) {
        return _invitees.length;
    }

    /**
     * @dev Returns current address list of invitees.
     */
    function inviteeList() external view returns (address[] memory) {
        return _invitees;
    }

    /**
     * @dev Returns currently released lottery reward amount in total.
     */
    function lotteryReleasedAmount() external view returns (uint) {
        return _withDecimal(_lotteryReleasedAmount);
    }

    /**
     * @dev Returns current number of gamblers.
     */
    function gamblers() external view returns (uint) {
        return _gamblers.length;
    }

    /**
     * @dev Returns current address list of gamblers.
     */
    function gamblerList() external view returns (address[] memory) {
        return _gamblers;
    }

    /**
     * @dev Returns inviter reward granted to `inviter`.
     */
    function inviterRewardReceived(address inviter) external view returns (uint) {
        return _withDecimal(_inviterRewards[inviter]);
    }

    /**
     * @dev Returns invitee reward granted to `invitee`.
     */
    function inviteeRewardReceived(address invitee) external view returns (uint) {
        return _withDecimal(_inviteeRewards[invitee]);
    }

    /**
     * @dev Returns gambler reward granted to `gambler`.
     */
    function gamblerRewardReceived(address gambler) external view returns (uint) {
        return _withDecimal(_gamblerRewards[gambler]);
    }

    /**
     * @dev Returns contract owner address.
     */
    function owner() external view returns (address) {
        return _owner;
    }

    /**
     * @dev Returns lottery start time. Lottery can only be played after this timestamp.
     */
    function lotteryStartTime() external view returns (uint) {
        return _lotteryStartTime;
    }

    /**
     * @dev Returns maximum token supply.
     */
    function maxSupply() external view returns (uint) {
        return _withDecimal(MAX_SUPPLY);
    }

    /**
     * @dev Change contract owner address to `newOwner`.
     *
     * We plan to change the contract owner address to a dead one (i.e. 0xdead) in the future.
     */
    function changeOwner(address newOwner) onlyOwner external returns (address) {
        _owner = newOwner;
        return _owner;
    }

    /**
     * @dev Change lottery start time to `newLotteryStartTime`.
     */
    function changeLotteryStartTime(uint newLotteryStartTime) onlyOwner external returns (uint) {
        _lotteryStartTime = newLotteryStartTime;
        return _lotteryStartTime;
    }

    /**
     * @dev Returns whether lottery has started.
     */
    function isLotteryStarted() public view returns (bool) {
        return block.timestamp >= _lotteryStartTime;
    }

    function _rewardInviter(address inviter) private returns (uint inviterReward) {
        if(_hasRewardedInviters < MAX_INVITATION || inviter == address(0)) {
            if (_inviterRewards[inviter] == 0) {
                _inviters.push(inviter);
            }
            _inviterRewards[inviter] += INVITER_REWARD;
            if(inviter != address(0)) {
                _hasRewardedInviters ++;
                inviterReward = _withDecimal(INVITER_REWARD);
                _mint(inviter, inviterReward);
            }
        }
    }

    function _inviteeReward(uint x) private pure returns (uint) {
        return INVITEE_REWARD_FACTOR_A / (x + INVITEE_REWARD_FACTOR_B);
    }

    function _getRandom(address input) private view returns (uint) {
        return uint256(uint160(input)) ^ block.prevrandao;
    }

    function _withDecimal(uint tokens) private view returns (uint) {
        return tokens * 10 ** decimals();
    }

    function _afterTokenTransfer(address, address, uint256) internal override view {
        require(totalSupply() <= _withDecimal(MAX_SUPPLY), "Total supply cannot exceed max supply.");
    }

    modifier onlyOwner() {
        require(_msgSender() == _owner, "Caller is restricted to the owner.");
        _;
    }

    modifier afterLotteryStartTime() {
        require(isLotteryStarted(), "Lottery has not started.");
        _;
    }
}
