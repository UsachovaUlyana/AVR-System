import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import {
  IconBolt, IconPanel, IconCable, IconPlug, IconGauge, IconFactory, IconHome, IconDoc,
  IconArrow, IconCheck, IconShield, IconRuble, IconClock,
} from '../components/icons';

const intro = [
  { icon: IconShield, title: 'Работаем по договору', desc: 'Фиксируем объём, смету и сроки. Гарантия 2 года на все работы.' },
  { icon: IconRuble, title: 'Прозрачные цены', desc: 'Смета без скрытых платежей. Стоимость материалов согласуем заранее.' },
  { icon: IconClock, title: 'Сдаём в срок', desc: 'Соблюдаем график и сдаём объект с исполнительной документацией.' },
];

const services = [
  {
    icon: IconBolt, title: 'Монтаж силовых и осветительных сетей',
    desc: 'Прокладка кабелей, установка светильников, розеток и выключателей на объектах любого назначения.',
    points: ['Штробление и прокладка кабеля', 'Розеточные и осветительные группы', 'Подключение и проверка'],
    price: 'от 350 ₽', unit: '/ точка',
  },
  {
    icon: IconPanel, title: 'Установка распределительных щитов',
    desc: 'Сборка и подключение щитов, автоматических выключателей и защитной автоматики.',
    points: ['Подбор и компоновка щита', 'Монтаж автоматики и УЗО', 'Маркировка и схема'],
    price: 'от 4 500 ₽', unit: '/ щит',
  },
  {
    icon: IconCable, title: 'Прокладка кабельных трасс',
    desc: 'Монтаж кабеленесущих систем: лотков, коробов и гофры на промышленных объектах.',
    points: ['Лотки, короба, гофра', 'Магистральные трассы', 'Маркировка кабельных линий'],
    price: 'от 180 ₽', unit: '/ п.м.',
  },
  {
    icon: IconPlug, title: 'Подключение оборудования',
    desc: 'Подключение производственных станков, бытовой техники, систем отопления и вентиляции.',
    points: ['Промышленное оборудование', 'Бытовая техника', 'Системы ОВиК'],
    price: 'от 1 200 ₽', unit: '/ ед.',
  },
  {
    icon: IconGauge, title: 'Электрические испытания',
    desc: 'Измерения сопротивления изоляции и заземления, испытания электроустановок с протоколами.',
    points: ['Замер сопротивления изоляции', 'Проверка заземления', 'Протоколы испытаний'],
    price: 'от 3 000 ₽', unit: '/ объект',
  },
  {
    icon: IconFactory, title: 'Электроснабжение производств',
    desc: 'Комплексные работы по электроснабжению заводов, складов и производственных помещений.',
    points: ['Силовое электроснабжение', 'Автоматизация', 'Ввод в эксплуатацию'],
    price: 'договорная', unit: '',
  },
  {
    icon: IconHome, title: 'Электрика в домах и офисах',
    desc: 'Монтаж электрики в квартирах, частных домах и офисных помещениях под ключ.',
    points: ['Полная замена проводки', 'Ремонт под ключ', 'Тёплые полы и автоматика'],
    price: 'от 1 500 ₽', unit: '/ м²',
  },
  {
    icon: IconDoc, title: 'Сдача объектов в эксплуатацию',
    desc: 'Подготовка исполнительной документации и взаимодействие с контролирующими органами.',
    points: ['Исполнительная документация', 'Согласования', 'Сдача объекта'],
    price: 'договорная', unit: '',
  },
];

const steps = [
  { n: 1, title: 'Заявка и выезд', desc: 'Принимаем заявку, бесплатно выезжаем на объект и оцениваем задачу.' },
  { n: 2, title: 'Смета и договор', desc: 'Готовим прозрачную смету, фиксируем стоимость и сроки в договоре.' },
  { n: 3, title: 'Монтаж', desc: 'Выполняем работы по нормам ПУЭ и ГОСТ, держим вас в курсе этапов.' },
  { n: 4, title: 'Сдача и гарантия', desc: 'Сдаём объект с документацией и даём гарантию 2 года.' },
];

export default function ServicesPage() {
  const { openOrderModal } = useApp();
  return (
    <>
      <section className="subhero subhero--services">
        <div className="container subhero-inner">
          <div className="subhero-crumbs"><Link to="/">Главная</Link> <span>/</span> <span>Услуги</span></div>
          <div className="eyebrow">Услуги</div>
          <h1>Электромонтаж под ключ</h1>
          <p>Полный спектр работ на жилых, коммерческих и промышленных объектах — от одной розетки до электроснабжения цеха.</p>
          <div className="subhero-actions">
            <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку</button>
            <a href="tel:+78001234567" className="btn btn-ghost-light btn-lg">+7 (800) 123-45-67</a>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-narrow">
          <div className="svc-intro">
            {intro.map((it, i) => {
              const Icon = it.icon;
              return (
                <div key={i} className="svc-intro-card">
                  <div className="svc-intro-ico"><Icon /></div>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sec-head sec-head--split">
            <div>
              <div className="eyebrow">Каталог</div>
              <h2>Что мы делаем</h2>
            </div>
          </div>

          <div className="svc-list">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={i} className="svc-list-card">
                  <div className="svc-list-head">
                    <div className="svc-list-ico"><Icon /></div>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                  <ul className="svc-list-points">
                    {s.points.map((p, j) => <li key={j}><IconCheck /> {p}</li>)}
                  </ul>
                  <div className="svc-list-foot">
                    <div className="svc-list-price">
                      Стоимость
                      <b>{s.price}<span>{s.unit && ` ${s.unit}`}</span></b>
                    </div>
                    <button className="btn btn-outline" onClick={openOrderModal}>Заказать <IconArrow /></button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 0 }}>
        <div className="page-narrow">
          <div className="sec-head">
            <div className="eyebrow eyebrow--center">Как мы работаем</div>
            <h2>Прозрачный процесс — от заявки до гарантии</h2>
          </div>
          <div className="process-grid">
            {steps.map(s => (
              <div key={s.n} className="process-step">
                <div className="process-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="estimate-cta" style={{ marginTop: 'clamp(48px, 7vh, 80px)' }}>
            <div className="estimate-copy">
              <h2>Нужна точная смета?</h2>
              <p>Опишите объект — рассчитаем стоимость с материалами и сроками и согласуем выезд специалиста.</p>
              <div className="estimate-benefits">
                <div className="estimate-benefit"><IconCheck /><strong>Бесплатный выезд</strong></div>
                <div className="estimate-benefit"><IconRuble /><strong>Прозрачная смета</strong></div>
                <div className="estimate-benefit"><IconClock /><strong>Фиксированные сроки</strong></div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={openOrderModal}>Оставить заявку на услугу</button>
            </div>
            <div className="estimate-image" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
