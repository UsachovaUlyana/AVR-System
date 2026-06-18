import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import servicesSheet from '../assets/site/services-sheet.png';
import {
  IconCalendar, IconShield, IconBuilding, IconUsers,
  IconPanel, IconGauge, IconPlug, IconDoc,
  IconArrow, IconBolt, IconWrench, IconPin, IconCheck, IconPhone,
} from '../components/icons';

const stats = [
  { icon: IconCalendar, value: '15 лет', label: 'на рынке электромонтажа' },
  { icon: IconShield, value: '2 года', label: 'гарантии на все работы' },
  { icon: IconBuilding, value: '500+', label: 'сданных объектов' },
  { icon: IconUsers, value: '50+', label: 'специалистов с допусками' },
];

const featured = [
  {
    media: 'media-apartment', tag: 'Под ключ', icon: IconWrench,
    title: 'Ремонт электрики под ключ',
    desc: 'Полная замена проводки, щита и розеточных групп в квартирах и домах — от демонтажа до сдачи.',
    price: 'от 1 500 ₽', unit: '/ м²',
  },
  {
    media: 'media-industrial', tag: 'Под ключ', icon: IconBolt,
    title: 'Проводка под ключ',
    desc: 'Проектирование и монтаж новой электропроводки с кабелем, штроблением и подключением.',
    price: 'от 350 ₽', unit: '/ точка',
  },
];

const quickServices = [
  { icon: IconPanel, title: 'Монтаж щитов', desc: 'Сборка и подключение распределительных щитов', price: 'от 4 500 ₽' },
  { icon: IconGauge, title: 'Электроиспытания', desc: 'Замеры изоляции, заземления, протоколы', price: 'от 3 000 ₽' },
  { icon: IconPlug, title: 'Подключение оборудования', desc: 'Бытовая техника и промышленные станки', price: 'от 1 200 ₽' },
  { icon: IconDoc, title: 'Сдача в эксплуатацию', desc: 'Исполнительная документация и допуски', price: 'договорная' },
];

const projects = [
  { media: 'media-apartment', cat: 'Квартира', title: 'Квартира 85 м²', place: 'Липецк, ЖК «Европейский»' },
  { media: 'media-cottage', cat: 'Дом', title: 'Дом 210 м²', place: 'Липецкая область' },
  { media: 'media-office', cat: 'Офис', title: 'Офис 340 м²', place: 'Воронеж, БЦ «Галерея Чижова»' },
  { media: 'media-industrial', cat: 'Производство', title: 'Цех 1200 м²', place: 'Воронежская область' },
];

const cities = ['Липецк', 'Воронеж', 'Елец', 'Грязи', 'Усмань', 'Борисоглебск', 'Павловск', 'Россошь'];

const mediaBg = {
  'media-apartment': 'left top',
  'media-cottage': 'right top',
  'media-office': 'left bottom',
  'media-industrial': 'right bottom',
};

function photoStyle(media) {
  return {
    backgroundImage: `url('${servicesSheet}')`,
    backgroundSize: '200% 200%',
    backgroundPosition: mediaBg[media],
  };
}

export default function HomePage() {
  const { openOrderModal } = useApp();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="eyebrow">Электромонтаж под ключ · Липецк · Воронеж</div>
            <h1>Электромонтаж <em>без переделок</em> и сорванных сроков</h1>
            <p>
              Проектируем и выполняем электромонтажные работы в квартирах, домах, офисах
              и на производстве. Фиксируем смету и сроки в договоре, даём гарантию 2 года.
            </p>
            <div className="hero-btns">
              <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
              <Link to="/services" className="btn btn-ghost-light btn-lg">Смотреть услуги <IconArrow /></Link>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <IconCheck />
                <div><b>Бесплатно</b><span>выезд и смета</span></div>
              </div>
              <div className="hero-feature">
                <IconShield />
                <div><b>2 года</b><span>гарантия по договору</span></div>
              </div>
              <div className="hero-feature">
                <IconCalendar />
                <div><b>В срок</b><span>фиксируем в договоре</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">Листайте вниз</div>
      </section>

      {/* STATS */}
      <section className="stats-band">
        <div className="stats-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-cell">
                <div className="stat-ico"><Icon /></div>
                <div className="stat-num">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="home-section">
        <div className="container">
          <div className="sec-head">
            <div className="eyebrow eyebrow--center">Услуги</div>
            <h2>Решаем задачи любой сложности</h2>
            <p>Два популярных направления «под ключ» и полный спектр сопутствующих работ.</p>
          </div>

          <div className="svc-feature-grid">
            {featured.map((f, i) => {
              const Icon = f.icon;
              return (
                <article key={i} className="svc-feature" style={photoStyle(f.media)}>
                  <div className="svc-feature-body">
                    <span className="svc-tag"><Icon /> {f.tag}</span>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                    <div className="svc-price">Стоимость <b>{f.price}</b> {f.unit}</div>
                    <button className="btn" onClick={openOrderModal}>Рассчитать стоимость <IconArrow /></button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="svc-chip-row">
            {quickServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={i} className="svc-chip">
                  <div className="svc-chip-ico"><Icon /></div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <div className="svc-chip-price">{s.price}</div>
                </article>
              );
            })}
          </div>

          <div className="home-cta-center">
            <Link to="/services" className="btn btn-outline btn-lg">Посмотреть все услуги <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* ABOUT BAND */}
      <section className="about-band">
        <div className="about-band-inner">
          <div className="about-copy">
            <div className="eyebrow">О компании</div>
            <h2>Делаем как для себя — и отвечаем за результат</h2>
            <p>
              ООО «АВР Систем» с 2010 года выполняет электромонтаж для жилых, коммерческих
              и промышленных объектов. Контролируем каждый этап и всегда на связи.
            </p>
            <div className="about-creds">
              <div className="about-cred">
                <IconShield />
                <div><b>СРО</b><span>допуск и лицензия</span></div>
              </div>
              <div className="about-cred">
                <IconCalendar />
                <div><b>с 2010</b><span>15 лет на рынке</span></div>
              </div>
              <div className="about-cred">
                <IconDoc />
                <div><b>Договор</b><span>смета и сроки</span></div>
              </div>
            </div>
            <div className="checks">
              <span>Прозрачные сметы без скрытых платежей</span>
              <span>Только сертифицированные материалы</span>
              <span>Соблюдаем нормы ПУЭ и ГОСТ</span>
              <span>Сдаём объект с полной документацией</span>
            </div>
            <Link to="/about" className="btn btn-ghost-light">Подробнее о компании <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="home-section">
        <div className="container">
          <div className="sec-head sec-head--split">
            <div>
              <div className="eyebrow">Портфолио</div>
              <h2>Последние проекты</h2>
            </div>
            <Link to="/services" className="text-link">Все услуги <IconArrow /></Link>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <article key={i} className="project-card" style={photoStyle(p.media)}>
                <span className="project-num">0{i + 1}</span>
                <span className="project-cat">{p.cat}</span>
                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p><IconPin /> {p.place}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="home-section area-band">
        <div className="container area-inner">
          <div className="area-copy">
            <div className="eyebrow">Зона действия</div>
            <h2>Работаем по Липецкой и Воронежской областям</h2>
            <p>
              Выезжаем на объекты в Липецке, Воронеже и городах области. Для крупных
              проектов рассматриваем соседние регионы индивидуально.
            </p>
            <div className="area-list" aria-label="Основные города выезда">
              {cities.map(c => <span key={c}>{c}</span>)}
            </div>
          </div>
          <div className="area-map" role="img" aria-label="Карта зоны действия АВР Систем" />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div className="eyebrow">Бесплатная консультация</div>
            <h2>Оставьте заявку — рассчитаем ваш объект</h2>
            <p>Опишите задачу, и мы свяжемся в течение часа: согласуем выезд, смету и сроки.</p>
            <div className="cta-benefits">
              <span className="cta-benefit"><IconCheck /> Бесплатно</span>
              <span className="cta-benefit"><IconCheck /> Быстрый ответ</span>
              <span className="cta-benefit"><IconCheck /> Без обязательств</span>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
              <a href="tel:+78001234567" className="cta-phone"><IconPhone /> +7 (800) 123-45-67</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
