import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import {
  IconShield, IconClock, IconCheck, IconUsers, IconDoc, IconArrow,
} from '../components/icons';

const stats = [
  { number: '15+', label: 'лет на рынке' },
  { number: '500+', label: 'выполненных объектов' },
  { number: '50+', label: 'специалистов в штате' },
  { number: '100%', label: 'объектов сданы в срок' },
];

const values = [
  { icon: IconShield, title: 'Ответственность', desc: 'Работаем по договору и несём полную ответственность за качество. Гарантия 2 года на все работы.' },
  { icon: IconCheck, title: 'Качество по нормам', desc: 'Соблюдаем ПУЭ, СНиП и ГОСТ. Используем только сертифицированные материалы.' },
  { icon: IconClock, title: 'Соблюдение сроков', desc: 'Ценим время заказчиков и строго придерживаемся договорных сроков на каждом этапе.' },
  { icon: IconUsers, title: 'Команда с допусками', desc: 'Более 50 специалистов с группами допуска по электробезопасности III–V.' },
  { icon: IconDoc, title: 'Полная документация', desc: 'Готовим исполнительную документацию и сдаём объект под ключ контролирующим органам.' },
  { icon: IconCheck, title: 'Контроль этапов', desc: 'Фиксируем объём, материалы и ответственных, чтобы объект не зависал между подрядчиками.' },
];

const timeline = [
  { year: '2010', text: 'Основание компании. Старт с небольшой бригады электриков.' },
  { year: '2014', text: 'Первые крупные коммерческие и промышленные объекты.' },
  { year: '2019', text: 'Вступление в СРО, расширение штата до 50+ специалистов.' },
  { year: 'Сегодня', text: 'Полный спектр электромонтажа по Липецкой и Воронежской областям.' },
];

const licenses = [
  'Лицензия на деятельность в области электроэнергетики',
  'Членство в СРО «Электромонтажные организации»',
  'Сотрудники с группой допуска по электробезопасности III–V',
  'Оборудование прошло поверку в аккредитованных лабораториях',
];

export default function AboutPage() {
  const { openOrderModal } = useApp();
  return (
    <>
      <section className="subhero subhero--about">
        <div className="container subhero-inner">
          <div className="subhero-crumbs"><Link to="/">Главная</Link> <span>/</span> <span>О компании</span></div>
          <div className="eyebrow">О компании</div>
          <h1>Команда, которая отвечает за результат</h1>
          <p>ООО «АВР Систем» выполняет электромонтажные работы для объектов разного масштаба и назначения с 2010 года.</p>
          <div className="subhero-stats">
            {stats.map((s, i) => (
              <div key={i} className="subhero-stat"><b>{s.number}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-narrow">
          <div className="about-story">
            <div>
              <div className="eyebrow">История</div>
              <h2>От бригады электриков до надёжного подрядчика</h2>
              <p>
                ООО «АВР Систем» основано в 2010 году. За 15 лет компания выросла из небольшой бригады
                в организацию, выполняющую полный спектр электромонтажных работ на объектах жилого,
                коммерческого и промышленного назначения.
              </p>
              <p>
                Сегодня в штате более 50 квалифицированных специалистов с допусками по электробезопасности.
                Мы работаем по всему региону и беремся за объекты любой сложности — от квартиры до цеха.
              </p>
            </div>
            <div className="about-story-media">
              <div className="about-story-badge">
                <b>15 лет</b>
                <span>надёжной работы на рынке</span>
              </div>
            </div>
          </div>

          <div className="sec-head">
            <div className="eyebrow eyebrow--center">Наши принципы</div>
            <h2>Почему нам доверяют</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <article key={i} className="value-card">
                  <div className="value-ico"><Icon /></div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page section-gray" style={{ paddingTop: 'var(--sec-pad)' }}>
        <div className="page-narrow">
          <div className="sec-head">
            <div className="eyebrow eyebrow--center">Путь компании</div>
            <h2>Ключевые этапы развития</h2>
          </div>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <p>{t.text}</p>
              </div>
            ))}
          </div>

          <div className="about-split" style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}>
            <div className="about-section">
              <h2>Наш подход</h2>
              <p>
                Каждый проект начинается с детального изучения технического задания и разработки
                оптимального технического решения. Мы работаем строго в соответствии с нормативными
                требованиями и несём полную ответственность за качество.
              </p>
              <p>На все виды работ предоставляется гарантия 2 года.</p>
            </div>
            <div className="about-section">
              <h2>Лицензии и допуски</h2>
              <ul className="about-list">
                {licenses.map((l, i) => <li key={i}><IconCheck /> {l}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div className="eyebrow">Готовы обсудить ваш объект?</div>
            <h2>Доверьте электромонтаж профессионалам</h2>
            <p>Оставьте заявку — бесплатно выедем на объект, оценим задачу и подготовим смету.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
              <Link to="/services" className="btn btn-ghost-light btn-lg">Смотреть услуги <IconArrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
