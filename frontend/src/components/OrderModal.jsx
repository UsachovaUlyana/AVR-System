import { useState, useEffect } from 'react';
import { api } from '../api';
import { useApp } from '../context/useApp';

const WORK_TYPES = [
  'Монтаж силовых и осветительных сетей',
  'Установка распределительных щитов',
  'Прокладка кабельных трасс',
  'Подключение электроприборов и оборудования',
  'Электроснабжение промышленных объектов',
  'Электрика в жилых домах и офисах',
  'Электрические испытания',
  'Сдача объектов в эксплуатацию',
  'Другое',
];

const PHONE_REGEX = /^\+?[\d\s\-(]{7,}/;
const EMPTY_FORM = { customerName: '', phone: '', address: '', workType: '', description: '' };

export default function OrderModal({ onClose }) {
  const { currentUser } = useApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function validate() {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Введите имя';
    if (!form.phone.trim()) e.phone = 'Введите телефон';
    else if (!PHONE_REGEX.test(form.phone)) e.phone = 'Неверный формат телефона';
    if (!form.address.trim()) e.address = 'Введите адрес объекта';
    if (!form.workType) e.workType = 'Выберите вид работ';
    if (!form.description.trim()) e.description = 'Опишите задачу';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      await api.createPublicOrder(form);
      setSuccess(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Оставить заявку</h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        {success ? (
          <div className="modal-success">
            <div className="modal-success-icon">✅</div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в течение часа.</p>
            {currentUser?.role === 'customer' && (
              <p className="modal-success-hint">Вы можете отследить статус заявки в <a href="/customer/orders">личном кабинете</a>.</p>
            )}
            <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            {errors.general && <div className="alert alert-error">{errors.general}</div>}
            {!currentUser && (
              <div className="modal-note">
                Оставляя заявку без авторизации, исполнитель сможет связаться с вами только по контактам, оставленным в заявке. Чат с исполнителем будет недоступен.
              </div>
            )}

            <div className="field">
              <label>Ваше имя *</label>
              <input
                type="text"
                value={form.customerName}
                onChange={e => handleChange('customerName', e.target.value)}
                placeholder="Иванов Иван Иванович"
                className={errors.customerName ? 'input-error' : ''}
                autoFocus
              />
              {errors.customerName && <span className="error-msg">{errors.customerName}</span>}
            </div>

            <div className="field">
              <label>Контактный телефон *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className="field">
              <label>Адрес объекта *</label>
              <input
                type="text"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
                placeholder="г. Москва, ул. Примерная, д. 1"
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="error-msg">{errors.address}</span>}
            </div>

            <div className="field">
              <label>Вид работ *</label>
              <select
                value={form.workType}
                onChange={e => handleChange('workType', e.target.value)}
                className={errors.workType ? 'input-error' : ''}
              >
                <option value="">— Выберите вид работ —</option>
                {WORK_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              {errors.workType && <span className="error-msg">{errors.workType}</span>}
            </div>

            <div className="field">
              <label>Описание задачи *</label>
              <textarea
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Опишите, что нужно сделать..."
                rows={3}
                className={errors.description ? 'input-error' : ''}
              />
              {errors.description && <span className="error-msg">{errors.description}</span>}
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
