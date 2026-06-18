import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { IconPin, IconPhone, IconMail, IconClock } from '../components/icons';

const cards = [
  { icon: IconPin, label: 'Адрес', value: 'г. Липецк, ул. Электрическая, д. 12, офис 305' },
  { icon: IconPhone, label: 'Телефон', value: '+7 (800) 123-45-67', href: 'tel:+78001234567' },
  { icon: IconMail, label: 'Email', value: 'info@avr-system.ru', href: 'mailto:info@avr-system.ru' },
  { icon: IconClock, label: 'Режим работы', value: 'Пн–Пт: 9:00–18:00' },
];

const perks = [
  'Ответим в течение часа в рабочее время',
  'Бесплатный выезд специалиста на объект',
  'Прозрачная смета без скрытых платежей',
];

export default function ContactsPage() {
  const { openOrderModal } = useApp();

  return (
    <>
      <section className="subhero subhero--contacts">
        <div className="container subhero-inner">
          <div className="subhero-crumbs"><Link to="/">Главная</Link> <span>/</span> <span>Контакты</span></div>
          <div className="eyebrow">Контакты</div>
          <h1>Свяжитесь с нами</h1>
          <p>Обсудим объект, сроки, материалы и удобный формат выезда специалиста. Работаем по Липецкой и Воронежской областям.</p>
          <div className="subhero-actions">
            <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
            <a href="tel:+78001234567" className="btn btn-ghost-light btn-lg">Позвонить</a>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-narrow">
          <div className="contacts-cards">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="contact-card">
                  <div className="contact-card-ico"><Icon /></div>
                  <div className="lbl">{c.label}</div>
                  {c.href
                    ? <a className="val" href={c.href}>{c.value}</a>
                    : <div className="val">{c.value}</div>}
                </div>
              );
            })}
          </div>

          <div className="contacts-split">
            <div className="contacts-cta-block">
              <h2>Оставьте заявку</h2>
              <p>Заполните короткую форму — мы свяжемся с вами в течение часа и обсудим детали проекта.</p>
              <div className="checks" style={{ gridTemplateColumns: '1fr', marginBottom: 28 }}>
                {perks.map((p, i) => <span key={i}>{p}</span>)}
              </div>
              <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
            </div>
            <div className="contacts-map" role="img" aria-label="Зона обслуживания: Липецкая и Воронежская области" />
          </div>
        </div>
      </section>
    </>
  );
}
