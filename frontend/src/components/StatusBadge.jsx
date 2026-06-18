const STATUS_CLASSES = {
  'Новая': 'status-badge--new',
  'В работе': 'status-badge--progress',
  'Выполнена': 'status-badge--done',
  'Отклонена': 'status-badge--rejected',
};

export default function StatusBadge({ status }) {
  const className = STATUS_CLASSES[status] || 'status-badge--default';
  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}
