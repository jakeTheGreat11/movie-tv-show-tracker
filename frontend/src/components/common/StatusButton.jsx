const StatusButton = ({ status, currentStatus, onClick }) => {
  const isActive = currentStatus === status;

  return (
    <button
      className={isActive ? "active" : ""}
      onClick={() => onClick(status)}
    >
      {status}
    </button>
  );
};

export default StatusButton;
