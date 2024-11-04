const StatusButton = ({ status, currentStatus, onClick }) => {
  const isActive = currentStatus === status;

  return (
    <button
      className={isActive ? "active" : ""}
      onClick={() => onClick(status)}
    >
      {isActive ? `remove from ${status}` : status}
    </button>
  );
};

export default StatusButton;
