"""
Master-план запуска → web/lib/seed.ts (tasks, subtasks) и data/master-plan.csv.
Запуск: python3 web/scripts/master-plan.py (из корня репозитория).
Строка: код | проект | поток | название | начало | конец | результат | кто | зависит от | cp | чеклист
"""
import csv, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WHO = {"A": "u-armen", "V": "u-vladimir", "K": "u-karina"}
WAVE = {"common": "", "wafl": "A", "kitchen": "B", "comx": "C", "cafe": "C"}

PLAN = """
# ─── ОБЩИЕ · LEGAL & FINANCE ───
GEN-01|common|LEGAL & FINANCE|Проверка договорных ограничений по помещениям|24.09|28.09|Понятно, что можно делать в каждом помещении|A|||
GEN-02|common|LEGAL & FINANCE|Подписание договоров по объектам|28.09|28.09|Договоры подписаны|A|GEN-01|cp|
GEN-03|common|LEGAL & FINANCE|Нотариус / оформление документов|28.09|28.09|Документы оформлены|A|||
GEN-04|common|LEGAL & FINANCE|Регистрация / запуск юрлиц|28.09|05.10|Юрструктура готова|A|GEN-03|cp|
GEN-05|common|LEGAL & FINANCE|Бухгалтерия: бухгалтер / аутсорс, налоговый режим|29.09|07.10|Бухгалтер есть, налоговый режим выбран|A|||
GEN-06|common|LEGAL & FINANCE|Банковские счета и платёжные инструменты|05.10|09.10|Счета открыты, можно платить поставщикам|A|GEN-04||
GEN-07|common|LEGAL & FINANCE|Финансовая модель и бюджет запуска|24.09|03.10|Бюджет по статьям утверждён Owner, резерв 10–15% заложен|A||cp|Первоначальные инвестиции;Ремонт и инженерия;Оборудование;Упаковка и мебель;Зарплаты;Аренда и коммунальные;Продукты и доставка;Маркетинг;Налоги;Резерв 10–15%
GEN-08|common|LEGAL & FINANCE|Требования и разрешения для food-проекта|24.09|02.10|Список требований и документов по Waffle и кухне|A||cp|
GEN-09|common|LEGAL & FINANCE|Требования к вывеске / фасаду / окну|24.09|02.10|Понятны ограничения по вывеске и окну|A|||
GEN-10|common|LEGAL & FINANCE|Получение разрешений и документов для food|05.10|20.10|Все документы на руках до soft launch Waffle|A|GEN-08,GEN-04|cp|
GEN-11|common|LEGAL & FINANCE|Договоры на вывоз отходов, дезинсекцию, клининг|12.10|22.10|Договоры подписаны, график есть|A|||
GEN-12|common|LEGAL & FINANCE|Страхование помещений и оборудования|15.10|25.10|Полис действует с открытия Waffle|A|||
# ─── ОБЩИЕ · SPACE & BUILD ───
GEN-20|common|SPACE & BUILD|Первичный осмотр объектов|24.09|25.09|Фото + видео + состояние всех помещений|A|||
GEN-21|common|SPACE & BUILD|Первичный обмер всех помещений|24.09|27.09|Точные размеры всех помещений|A|||
GEN-22|common|SPACE & BUILD|Что можно и что нельзя демонтировать|24.09|26.09|Список ограничений по демонтажу|A||cp|
GEN-23|common|SPACE & BUILD|Техническое обследование инженерии|24.09|30.09|Мощности и точки подключения по каждому объекту|A|||Электричество: мощность и точки;Вода: точки подключения;Канализация;Вентиляция;Возможность вытяжки;Отопление / кондиционирование
GEN-24|common|SPACE & BUILD|Пожарные и санитарные требования к объектам|24.09|02.10|Требования к каждому объекту записаны|A|||
GEN-25|common|SPACE & BUILD|Технический паспорт объектов|30.09|03.10|Единая таблица ограничений по всем помещениям|A|GEN-21,GEN-23||
GEN-26|common|SPACE & BUILD|Подрядчики: электрик, сантехник, вентиляция|24.09|30.09|Подрядчики выбраны, есть сметы|A|||Электрик / инженер;Сантехник;Вентиляционная компания
GEN-27|common|SPACE & BUILD|Общий график ремонта: Waffle → Dark Kitchen → COMX → CAFE|29.09|02.10|Очерёдность и окна работ по объектам утверждены|A|GEN-22||
GEN-28|common|SPACE & BUILD|Предварительный расчёт инженерных работ|30.09|05.10|Бюджет инженерии по объектам|A|GEN-26||
GEN-29|common|SPACE & BUILD|Интернет, Wi-Fi, видеонаблюдение, сигнализация|12.10|22.10|Всё подключено в Waffle и на кухне|A|||
GEN-30|common|SPACE & BUILD|Пожарная безопасность: огнетушители, датчики, план эвакуации|15.10|24.10|Объекты готовы к проверке|A|||
# ─── ОБЩИЕ · BRAND & MARKETING ───
GEN-40|common|BRAND & MARKETING|Сбор референсов, moodboard|24.09|26.09|Moodboard|V|||
GEN-41|common|BRAND & MARKETING|Исследование конкурентов и визуального поля|24.09|28.09|Понимание рынка и свободных ниш|K|||
GEN-42|common|BRAND & MARKETING|Brand concept|26.09|30.09|Концепция бренда|V|GEN-40||
GEN-43|common|BRAND & MARKETING|Название и позиционирование|28.09|01.10|Название и позиционирование зафиксированы|V|||
GEN-44|common|BRAND & MARKETING|Варианты логотипа|01.10|05.10|3–5 вариантов|V|GEN-42,GEN-43||
GEN-45|common|BRAND & MARKETING|Выбор направления логотипа|05.10|06.10|Owner выбрал одно направление|A|GEN-44||
GEN-46|common|BRAND & MARKETING|Айдентика|06.10|15.10|Готовая визуальная система|V|GEN-45||
GEN-47|common|BRAND & MARKETING|Tone of Voice|06.10|08.10|Правила коммуникации|K|GEN-45||
GEN-48|common|BRAND & MARKETING|Бренд-гайд / базовые правила|15.10|19.10|Базовый brand book|V|GEN-46||
GEN-49|common|BRAND & MARKETING|Униформа персонала|15.10|22.10|Униформа заказана к обучению персонала|V|GEN-46||
GEN-50|common|BRAND & MARKETING|Проверка доменов|24.09|26.09|Доступные варианты|K|||
GEN-51|common|BRAND & MARKETING|Покупка доменов|26.09|30.09|Домены зарегистрированы|K|GEN-50||
GEN-52|common|BRAND & MARKETING|Регистрация соцсетей|01.10|05.10|Аккаунты созданы|K|GEN-43||
GEN-53|common|BRAND & MARKETING|Оформление соцсетей|15.10|18.10|Готовые профили в айдентике|K|GEN-46,GEN-52||
GEN-54|common|BRAND & MARKETING|Контент-план запуска|10.10|17.10|План публикаций до и после открытия|K|GEN-47||
GEN-55|common|BRAND & MARKETING|Фото и визуальный контент|18.10|25.10|Контент для запуска|K|GEN-46||
GEN-56|common|BRAND & MARKETING|Сайт / лендинг|15.10|25.10|Лендинг на домене, ссылка на приложение|V|GEN-46,GEN-51||
GEN-57|common|BRAND & MARKETING|Карточки в Google Maps, Yandex Maps, 2GIS|20.10|25.10|Точка находится на картах|K|||
GEN-58|common|BRAND & MARKETING|PR открытия: блогеры, городские медиа, событие|15.10|28.10|Список блогеров и медиа, план события|K|||
# ─── ОБЩИЕ · PEOPLE / SUPPLY / LAUNCH ───
GEN-60|common|PEOPLE & TRAINING|Трудовые договоры, зарплатная схема, мотивация|08.10|15.10|Шаблоны договоров и схема оплаты|A|GEN-04||
GEN-61|common|PEOPLE & TRAINING|Медкнижки / санминимум персонала|15.10|24.10|У всех сотрудников документы до смен|A|||
GEN-70|common|EQUIPMENT & SUPPLY|Касса, POS, эквайринг, учёт|01.10|15.10|POS куплен и настроен, эквайринг работает|A||cp|Касса / фискализация;Эквайринг;Учётная система;Склад и списания;Себестоимость и отчётность;Интеграция с доставкой;Интеграция с приложением лояльности
GEN-71|common|EQUIPMENT & SUPPLY|Логистика закупок: кто, где, как часто|10.10|20.10|Таблица закупок с резервными поставщиками|A||| Кто закупает;Что и где;Как часто;Минимальная партия;Срок поставки;Резервный поставщик для критичных продуктов
GEN-80|common|LAUNCH & OPS|Food safety: процедуры и контроль|12.10|22.10|Процедуры записаны и распечатаны на объектах|A|||Графики уборки;Температурный контроль;Контроль сроков годности;Личная гигиена;HACCP-логика процессов;Документы поставщиков
GEN-81|common|LAUNCH & OPS|Стандарты работы: открытие и закрытие смены, сервис|15.10|22.10|Чек-листы смены и стандарты сервиса|A|||
GEN-82|common|LAUNCH & OPS|Ежедневный отчёт после запуска|20.10|27.10|Шаблон: продажи, food cost, отзывы, проблемы|A|||
# ─── WAFFLE · SPACE (демонтаж → замер → планировка → дизайн → согласование → ремонт) ───
WAF-01|wafl|SPACE & BUILD|Демонтаж Waffle|29.09|01.10|Помещение освобождено|A|GEN-02,GEN-22|cp|
WAF-02|wafl|SPACE & BUILD|Замер Waffle после демонтажа|02.10|03.10|Чистовые размеры|A|WAF-01||
WAF-03|wafl|SPACE & BUILD|Планировка Waffle|03.10|06.10|Утверждённая схема|A|WAF-02|cp|
WAF-04|wafl|SPACE & BUILD|Проверка планировки с оборудованием|06.10|08.10|Всё помещается|A|WAF-03,WAF-22||
WAF-05|wafl|SPACE & BUILD|Финальный инженерный план Waffle|06.10|09.10|Можно начинать монтаж|A|WAF-03,GEN-25||
WAF-06|wafl|SPACE & BUILD|Дизайн точки Waffle|08.10|13.10|Дизайн-проект|V|WAF-04,GEN-45||
WAF-07|wafl|SPACE & BUILD|Согласование дизайна и работ: арендодатель, фасад, пожарные|13.10|15.10|Письменное согласие на работы|A|WAF-06,GEN-09|cp|
WAF-08|wafl|SPACE & BUILD|Ремонт и инженерные работы Waffle|15.10|21.10|Точка готова к монтажу оборудования|A|WAF-07,WAF-05|cp|
WAF-09|wafl|SPACE & BUILD|Заказ материалов и мебели|13.10|17.10|Всё заказано|A|WAF-06||
WAF-10|wafl|SPACE & BUILD|Подрядчик на окно выдачи|24.09|30.09|Подрядчик выбран|A||cp|
WAF-11|wafl|SPACE & BUILD|Замер окна|02.10|03.10|Точные размеры проёма|A|WAF-10,WAF-01||
WAF-12|wafl|SPACE & BUILD|Производство окна|03.10|15.10|Окно готово|A|WAF-11,GEN-09|cp|
WAF-13|wafl|SPACE & BUILD|Монтаж окна|15.10|20.10|Окно установлено|A|WAF-12|cp|
# ─── WAFFLE · EQUIPMENT & SUPPLY ───
WAF-20|wafl|EQUIPMENT & SUPPLY|Можно ли привезти оборудование|24.09|25.09|Ответ: везём или покупаем локально|A|||
WAF-21|wafl|EQUIPMENT & SUPPLY|Поиск локального оборудования (если привезти нельзя)|25.09|02.10|Альтернативы с ценами|A|WAF-20||
WAF-22|wafl|EQUIPMENT & SUPPLY|Сравнение оборудования и цен, выбор|29.09|05.10|Выбранный вариант|A|WAF-20||
WAF-23|wafl|EQUIPMENT & SUPPLY|Производственная мощность: сколько вафель в час в пик|01.10|05.10|Мощность ≥ пиковой нагрузки|A|||Время производства;Мощность оборудования;Сколько людей на смене;Максимальный объём;Пиковая нагрузка
WAF-24|wafl|EQUIPMENT & SUPPLY|Заказ оборудования|05.10|08.10|Оплачено, есть дата доставки|A|WAF-22,GEN-07|cp|
WAF-25|wafl|EQUIPMENT & SUPPLY|Доставка оборудования|08.10|19.10|Оборудование на объекте|A|WAF-24|cp|
WAF-26|wafl|EQUIPMENT & SUPPLY|Хранение: холодильник, морозилка, сухой склад, упаковка|10.10|20.10|Всё заказано и помещается|A|WAF-04||Холодильник;Морозильник;Сухой склад;Место под упаковку;Маркировка FIFO/FEFO
WAF-27|wafl|EQUIPMENT & SUPPLY|Поставщики продуктов + резервные|10.10|18.10|Договорённости с основными и резервными|A|||
WAF-28|wafl|EQUIPMENT & SUPPLY|Упаковка Waffle: дизайн и поставщик|08.10|18.10|Дизайн утверждён, поставщик выбран|V|GEN-45||
WAF-29|wafl|EQUIPMENT & SUPPLY|Заказ упаковки|18.10|23.10|Упаковка на руках|A|WAF-28||
WAF-30|wafl|EQUIPMENT & SUPPLY|Монтаж оборудования|21.10|24.10|Оборудование работает|A|WAF-08,WAF-25,WAF-13|cp|
# ─── WAFFLE · PRODUCT & APP ───
WAF-40|wafl|PRODUCT & APP|Поиск шеф-кондитера|24.09|05.10|Кандидаты|A|||
WAF-41|wafl|PRODUCT & APP|Выбор шеф-кондитера|05.10|07.10|Человек найден|A|WAF-40|cp|
WAF-42|wafl|PRODUCT & APP|Концепция продукта и ассортимент|29.09|05.10|Ассортимент|A|||
WAF-43|wafl|PRODUCT & APP|Разработка рецептур|07.10|15.10|Рецептуры|A|WAF-41,WAF-42|cp|
WAF-44|wafl|PRODUCT & APP|Тестирование рецептур|15.10|19.10|Финальные продукты|A|WAF-43||
WAF-45|wafl|PRODUCT & APP|Техкарты Waffle|19.10|22.10|Техкарты|A|WAF-44||
WAF-46|wafl|PRODUCT & APP|Себестоимость и цены|19.10|22.10|Food cost и цены утверждены|A|WAF-44||
WAF-47|wafl|BRAND & MARKETING|Меню-борд и POSM для окна|22.10|25.10|Меню и POSM напечатаны|V|WAF-46,GEN-46||
WAF-48|wafl|LEGAL & FINANCE|Юнит-экономика точки Waffle|29.09|05.10|Средний чек, food cost, точка безубыточности|A|||
# ─── WAFFLE · PEOPLE & TRAINING ───
WAF-50|wafl|PEOPLE & TRAINING|Штатная структура Waffle|06.10|08.10|Штат и график смен|A|||
WAF-51|wafl|PEOPLE & TRAINING|Поиск кондитеров и бариста|08.10|15.10|Кандидаты|A|WAF-50||Кондитеры;Бариста
WAF-52|wafl|PEOPLE & TRAINING|Собеседования|12.10|18.10|Выбор|A|||
WAF-53|wafl|PEOPLE & TRAINING|Найм и договоры|18.10|20.10|Команда подписана|A|WAF-52,GEN-60||
WAF-54|wafl|PEOPLE & TRAINING|Обучение персонала|21.10|24.10|Персонал готов|A|WAF-53|cp|
WAF-55|wafl|PEOPLE & TRAINING|Тестовые смены|24.10|26.10|Смена отработана без сбоев|A|WAF-54,WAF-30|cp|
# ─── WAFFLE · LAUNCH & OPS ───
WAF-60|wafl|LAUNCH & OPS|Тест производства Waffle|24.10|25.10|Скорость и качество в норме|A|WAF-30||
WAF-61|wafl|LAUNCH & OPS|Soft launch: ограниченные продажи|26.10|27.10|Первые продажи|A|WAF-55,WAF-60,GEN-10,GEN-70|cp|
WAF-62|wafl|LAUNCH & OPS|Анализ и корректировки|27.10|28.10|Исправления внесены|A|WAF-61||
WAF-63|wafl|LAUNCH & OPS|🚀 WAFFLE LAUNCH|28.10|28.10|Работающая точка|A|WAF-62,APP-16|cp|
# ─── WAFFLE · ПРИЛОЖЕНИЕ: Telegram Mini App (лояльность + геймификация) ───
APP-01|wafl|PRODUCT & APP|App: цели и механика лояльности|24.09|29.09|Выбрана механика: баллы / штампы / уровни|A|||Баллы или кэшбэк;Цифровые штампы;Уровни гостя;Приветственный бонус
APP-02|wafl|PRODUCT & APP|App: механики геймификации|26.09|01.10|Список механик и наград|V|||Челленджи;Стрики (серии визитов);Коллекции / ачивки;Мини-игра или колесо;Награды
APP-03|wafl|PRODUCT & APP|App: команда разработки Telegram Mini App|24.09|01.10|Разработчик выбран, есть опыт Mini Apps|A|||
APP-04|wafl|PRODUCT & APP|App: техническое задание Mini App|01.10|05.10|ТЗ согласовано Owner|A|APP-01,APP-02,APP-03|cp|User stories;Экраны;Вход через Telegram (без паролей);Уведомления от бота;Админка;Интеграция с POS;Аналитика
APP-05|wafl|PRODUCT & APP|App: договор с разработчиком, смета, этапы приёмки|05.10|07.10|Договор подписан|A|APP-04||
APP-06|wafl|PRODUCT & APP|App: UX-прототип|07.10|10.10|Кликабельный прототип|V|APP-05||
APP-07|wafl|PRODUCT & APP|App: UI-дизайн в айдентике|15.10|18.10|Макеты всех экранов|V|APP-06,GEN-46||
APP-08|wafl|PRODUCT & APP|App: backend — пользователи, баллы, акции, админка|10.10|20.10|API и админка работают|A|APP-06||
APP-09|wafl|PRODUCT & APP|App: интеграция с POS — начисление и списание баллов|15.10|21.10|Баллы начисляются с чека|A|APP-06,GEN-70||
APP-10|wafl|PRODUCT & APP|App: Mini App — клиентская часть (UI после APP-07)|12.10|22.10|Все экраны работают в Telegram на iOS и Android|A|APP-06||
APP-11|wafl|LEGAL & FINANCE|App: правила программы, оферта, политика ПДн|08.10|16.10|Документы опубликованы|A|GEN-04||
APP-12|wafl|PRODUCT & APP|App: тестирование (QA)|22.10|24.10|Критичных багов нет|A|APP-08,APP-09,APP-10|cp|
APP-13|wafl|PRODUCT & APP|App: бета на тестовых сменах|24.10|26.10|Команда прошла все сценарии|A|APP-12||
APP-14|wafl|PRODUCT & APP|App: бот и публикация Mini App в Telegram|24.10|27.10|Бот с кнопкой Mini App доступен гостям|A|APP-12|cp|Бот создан через BotFather;Название, аватар, описание в айдентике;Кнопка меню открывает Mini App;Приветственное сообщение;Домен Mini App подключён
APP-15|wafl|BRAND & MARKETING|App: промо — QR на окне и упаковке ведёт в бот, стартовая акция|20.10|27.10|QR и акция готовы к открытию|K|APP-06||
APP-16|wafl|LAUNCH & OPS|App: запуск вместе с открытием Waffle|27.10|28.10|Первые гости в программе|A|APP-13,APP-14|cp|
# ─── DARK KITCHEN · КОНЦЕПЦИИ ───
DK-01|kitchen|PRODUCT & APP|Исследование рынка доставки: конкуренты, цены, агрегаторы|24.09|30.09|Карта конкурентов|K|||
DK-02|kitchen|PRODUCT & APP|Общая концепция Dark Kitchen|24.09|03.10|Концепция|A|||
DK-03|kitchen|PRODUCT & APP|Long list виртуальных брендов|26.09|03.10|Long list|V|||
DK-04|kitchen|PRODUCT & APP|Концепции брендов: кухня, меню, цена, ЦА, позиционирование|03.10|07.10|Концепция по каждому кандидату|V|DK-03||
DK-05|kitchen|PRODUCT & APP|Выбор 2–4 брендов для MVP|07.10|08.10|Owner утвердил бренды|A|DK-04,DK-01,DK-02|cp|
DK-06|kitchen|LEGAL & FINANCE|Юнит-экономика каждого бренда|08.10|14.10|Экономика по каждому бренду|A|DK-05||
DK-07|kitchen|BRAND & MARKETING|Нейминг и айдентика виртуальных брендов|08.10|18.10|Логотипы и визуал брендов|V|DK-05||
DK-08|kitchen|PRODUCT & APP|MVP-меню|08.10|15.10|MVP menu|A|DK-05||
DK-09|kitchen|PRODUCT & APP|Рецептуры Dark Kitchen|15.10|24.10|Рецептуры|A|DK-08|cp|
DK-10|kitchen|PRODUCT & APP|Тест-дегустация / фокус-группа|24.10|27.10|Рабочие блюда|A|DK-09|cp|
DK-11|kitchen|PRODUCT & APP|Техкарты Dark Kitchen|27.10|30.10|Техкарты|A|DK-10||
DK-12|kitchen|PRODUCT & APP|Себестоимость и цены|27.10|30.10|Food cost и цены|A|DK-10||
DK-13|kitchen|EQUIPMENT & SUPPLY|Поставщики продуктов + резервные|12.10|25.10|Поставщики|A|||
DK-14|kitchen|EQUIPMENT & SUPPLY|Упаковка для доставки: дизайн, тест, заказ|18.10|31.10|Упаковка на руках|V|DK-07||Дизайн;Тест на время доставки;Заказ
DK-15|kitchen|BRAND & MARKETING|Фото блюд для агрегаторов|28.10|31.10|Фото всех позиций|K|DK-10||
DK-16|kitchen|LAUNCH & OPS|Подключение к агрегаторам: договоры, меню, модерация|20.10|03.11|Бренды опубликованы на агрегаторах|A|DK-07,GEN-04|cp|Договоры;Загрузка меню и цен;Фото;Модерация
DK-17|kitchen|LAUNCH & OPS|Модель доставки: агрегаторы / свои курьеры / служба|08.10|15.10|Стоимость, SLA, зона, время доставки|A|DK-05||
# ─── DARK KITCHEN · SPACE & BUILD ───
DK-20|kitchen|SPACE & BUILD|Демонтаж кухни|02.10|06.10|Помещение освобождено|A|WAF-01,GEN-22|cp|
DK-21|kitchen|SPACE & BUILD|Замер кухни после демонтажа|07.10|07.10|Чистовые размеры|A|DK-20||
DK-22|kitchen|SPACE & BUILD|Планировка кухни|07.10|10.10|Утверждённая схема|A|DK-21||
DK-23|kitchen|SPACE & BUILD|Проверка планировки с оборудованием|13.10|14.10|Всё помещается|A|DK-22,DK-30||
DK-24|kitchen|SPACE & BUILD|Инженерный проект: вытяжка, вентиляция, электричество, вода|10.10|14.10|Коммуникации спроектированы|A|DK-22,GEN-25|cp|
DK-25|kitchen|SPACE & BUILD|Дизайн кухни|14.10|18.10|Дизайн-проект|V|DK-23||
DK-26|kitchen|SPACE & BUILD|Согласование: арендодатель, пожарные, санитария|18.10|21.10|Письменное согласие на работы|A|DK-25,DK-24|cp|
DK-27|kitchen|SPACE & BUILD|Ремонт и инженерные работы кухни|21.10|31.10|Кухня готова к монтажу оборудования|A|DK-26|cp|
# ─── DARK KITCHEN · EQUIPMENT ───
DK-30|kitchen|EQUIPMENT & SUPPLY|Список и выбор оборудования под меню|08.10|13.10|Список оборудования|A|DK-05||
DK-31|kitchen|EQUIPMENT & SUPPLY|Производственная мощность: заказов в час в пик|10.10|14.10|Мощность ≥ пиковой нагрузки|A|||
DK-32|kitchen|EQUIPMENT & SUPPLY|Заказ оборудования кухни|13.10|15.10|Оплачено, есть дата доставки|A|DK-30,GEN-07|cp|
DK-33|kitchen|EQUIPMENT & SUPPLY|Доставка оборудования кухни|15.10|28.10|Оборудование на объекте|A|DK-32|cp|
DK-34|kitchen|EQUIPMENT & SUPPLY|Хранение: холод, заморозка, сухой склад, маркировка|15.10|28.10|Хранение готово|A|||Холодильные камеры;Заморозка;Сухой склад;Маркировка FIFO/FEFO
DK-35|kitchen|EQUIPMENT & SUPPLY|Монтаж оборудования кухни|31.10|02.11|Оборудование работает|A|DK-27,DK-33|cp|
# ─── DARK KITCHEN · PEOPLE & TRAINING ───
DK-40|kitchen|PEOPLE & TRAINING|Штатная структура кухни|15.10|18.10|Штат|A|||
DK-41|kitchen|PEOPLE & TRAINING|Поиск персонала: су-шеф, повара, упаковщик|18.10|27.10|Кандидаты|A|DK-40||
DK-42|kitchen|PEOPLE & TRAINING|Найм кухни|27.10|31.10|Команда|A|DK-41,GEN-60||
DK-43|kitchen|PEOPLE & TRAINING|Обучение по техкартам|01.11|04.11|Команда готова|A|DK-42,DK-11||
DK-44|kitchen|PEOPLE & TRAINING|Тестовые смены кухни|04.11|05.11|Проверка|A|DK-43,DK-35|cp|
# ─── DARK KITCHEN · LAUNCH & OPS ───
DK-50|kitchen|LAUNCH & OPS|Production test: время готовки и сборки заказа|03.11|04.11|Проверка производства|A|DK-35||
DK-51|kitchen|LAUNCH & OPS|Тестовый запуск: закрытые заказы (команда, друзья)|05.11|06.11|Первые заказы без сбоев|A|DK-44,DK-50,DK-16|cp|
DK-52|kitchen|LAUNCH & OPS|Soft launch на агрегаторах, ограниченные часы|06.11|08.11|Первые реальные заказы|A|DK-51|cp|
DK-53|kitchen|LAUNCH & OPS|Анализ и корректировки: время, отзывы, food cost|08.11|10.11|Исправления|A|DK-52||
DK-54|kitchen|LAUNCH & OPS|🚀 DARK KITCHEN LAUNCH|10.11|10.11|Первый полноценный запуск|A|DK-53|cp|
# ─── COMX (книжный / комиксы) ───
BK-01|comx|PRODUCT & APP|Концепция COMX: ассортимент, формат, события|20.10|31.10|Концепция утверждена|V|||
BK-02|comx|SPACE & BUILD|Демонтаж COMX|02.11|06.11|Помещение освобождено|A|DK-20||
BK-03|comx|SPACE & BUILD|Замер COMX|06.11|07.11|Размеры|A|BK-02||
BK-04|comx|SPACE & BUILD|Планировка COMX|07.11|12.11|Схема|A|BK-03||
BK-05|comx|SPACE & BUILD|Дизайн COMX|12.11|20.11|Дизайн-проект|V|BK-04||
BK-06|comx|SPACE & BUILD|Согласование COMX|20.11|24.11|Согласие на работы|A|BK-05||
BK-07|comx|SPACE & BUILD|Ремонт COMX|24.11|08.12|Помещение готово|A|BK-06||
BK-08|comx|EQUIPMENT & SUPPLY|Поставщики книг и комиксов, первая закупка|01.11|25.11|Первая партия заказана|V|BK-01||
BK-09|comx|EQUIPMENT & SUPPLY|Стеллажи и мебель|20.11|05.12|Мебель на месте|A|BK-05||
BK-10|comx|PEOPLE & TRAINING|Персонал COMX|20.11|08.12|Команда|A|||
BK-11|comx|LAUNCH & OPS|Soft launch COMX|10.12|13.12|Первые продажи|A|BK-07,BK-09||
BK-12|comx|LAUNCH & OPS|🚀 Открытие COMX|15.12|15.12|Работающий книжный|A|BK-11||
# ─── CAFE ───
CAF-01|cafe|PRODUCT & APP|Концепция кафе: меню, зал, бар|01.11|15.11|Концепция утверждена|A|||
CAF-02|cafe|SPACE & BUILD|Демонтаж кафе|16.11|20.11|Помещение освобождено|A|BK-02||
CAF-03|cafe|SPACE & BUILD|Замер кафе|20.11|21.11|Размеры|A|CAF-02||
CAF-04|cafe|SPACE & BUILD|Планировка кафе|21.11|27.11|Схема|A|CAF-03||
CAF-05|cafe|SPACE & BUILD|Дизайн кафе|27.11|07.12|Дизайн-проект|V|CAF-04||
CAF-06|cafe|SPACE & BUILD|Согласование кафе|07.12|10.12|Согласие на работы|A|CAF-05||
CAF-07|cafe|SPACE & BUILD|Ремонт кафе|10.12|08.01|Помещение готово|A|CAF-06||
CAF-08|cafe|EQUIPMENT & SUPPLY|Оборудование и мебель кафе|01.12|05.01|Всё на месте|A|CAF-04||
CAF-09|cafe|PRODUCT & APP|Меню и рецептуры кафе|15.11|20.12|Меню, техкарты|A|CAF-01||
CAF-10|cafe|PEOPLE & TRAINING|Персонал: бариста, бармен, официанты|10.12|08.01|Команда|A|||
CAF-11|cafe|LAUNCH & OPS|Soft launch кафе|10.01|13.01|Первые гости|A|CAF-07,CAF-10||
CAF-12|cafe|LAUNCH & OPS|🚀 Открытие CAFE|15.01|15.01|Работающее кафе|A|CAF-11||
"""

def iso(d):
    dd, mm = d.split(".")
    year = 2027 if int(mm) < 9 else 2026
    return f"{year}-{mm}-{dd}"

rows = []
for line in PLAN.strip().splitlines():
    if not line.strip() or line.startswith("#"):
        continue
    p = [x.strip() for x in line.split("|")]
    code, zone, stream, title, start, end, result, who, deps, cp, check = p
    rows.append(dict(code=code, zone=zone, stream=stream, title=title, start=iso(start), end=iso(end),
                     result=result, who=WHO[who], deps=[d for d in deps.split(",") if d],
                     cp=cp == "cp", check=[c.strip() for c in check.split(";") if c.strip()]))

by = {r["code"]: r for r in rows}
errors = []
if len(by) != len(rows):
    errors.append("дубли кодов")
for r in rows:
    if r["end"] < r["start"]:
        errors.append(f"{r['code']}: конец раньше начала")
    for d in r["deps"]:
        if d not in by:
            errors.append(f"{r['code']}: нет {d}")
        elif by[d]["end"] > r["start"]:
            errors.append(f"{r['code']} начинается {r['start']} раньше, чем закончится {d} ({by[d]['end']})")
if errors:
    print("\n".join(errors)); sys.exit(1)

tasks, subtasks = [], []
for r in rows:
    tid = "t-" + r["code"].lower()
    launch = r["title"].startswith("🚀")
    tasks.append({
        "id": tid, "title": r["title"], "description": "",
        "zone": r["zone"], "zones": [r["zone"]],
        "assigneeId": r["who"], "authorId": "u-armen", "participantIds": [],
        "startDate": r["start"], "due": r["end"],
        "priority": "critical" if r["cp"] else ("high" if launch or r["stream"] == "LAUNCH" else "medium"),
        "status": "todo", "weight": 3 if r["cp"] else 1, "criticalPath": r["cp"],
        "result": r["result"], "createdAt": "2026-09-24", "attachments": [],
        "code": r["code"], "wave": WAVE[r["zone"]], "workstream": r["stream"],
        "dependsOn": r["deps"], "blockReason": "",
    })
    for i, c in enumerate(r["check"], 1):
        subtasks.append({"id": f"s-{r['code'].lower()}-{i}", "taskId": tid, "title": c, "done": False})

seed_path = ROOT / "web/lib/seed.ts"
src = seed_path.read_text()
head, body = src.split("export const seed: AppState = ", 1)
seed = json.loads(body.strip().rstrip(";"))
seed["tasks"] = tasks
seed["subtasks"] = subtasks
seed_path.write_text(head + "export const seed: AppState = " + json.dumps(seed, ensure_ascii=False, indent=2) + ";\n")

with open(ROOT / "data/master-plan.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Код", "Проект", "Поток", "Задача", "Начало", "Конец", "Результат (готово когда)", "Исполнитель", "Зависит от", "Critical path", "Чеклист"])
    names = {"u-armen": "Armen", "u-vladimir": "Vladimir", "u-karina": "Karina"}
    for r in rows:
        w.writerow([r["code"], r["zone"], r["stream"], r["title"], r["start"], r["end"], r["result"],
                    names[r["who"]], ", ".join(r["deps"]), "да" if r["cp"] else "", "; ".join(r["check"])])

print(f"ok: {len(tasks)} задач, {len(subtasks)} пунктов чеклистов, critical path: {sum(r['cp'] for r in rows)}")
