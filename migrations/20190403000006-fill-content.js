'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('content', [
			{
				sContentKey: "header_1_1",
				sContentName: "Заголовок 1.1",
				sContentValue:"Идеальную квартиру, на берегу Черного моря"
			},
			{
				sContentKey: "header_1_2",
				sContentName: "Заголовок 1.2",
				sContentValue:"Подберем вашу"
			},
			{
				sContentKey: "header_1_3",
				sContentName: "Заголовок 1.3",
				sContentValue:"и поможем  продать старую квартиру"
			},
			{
				sContentKey: "header_1_3",
				sContentName: "Заголовок 1.3",
				sContentValue:"и поможем  продать старую квартиру"
			},
			{
				sContentKey: "video_header",
				sContentName: "Видео на первом экране",
				sContentValue:"video/video.mp4"
			},
			{
				sContentKey: "p_1",
				sContentName: "Текст под Заголовоком 1",
				sContentValue:"Проведем бесплатную оценку"
			},
			{
				sContentKey: "p_1",
				sContentName: "Текст под Заголовоком 2",
				sContentValue:"для обмена на новую квартиру"
			},
			{
				sContentKey: "play_video_img",
				sContentName: "Картинка для видео",
				sContentValue:"/images/main/video-thumb1.jpg"
			},
			{
				sContentKey: "play_video_img",
				sContentName: "Картинка для видео",
				sContentValue:"/images/main/video-thumb1.jpg"
			},
			{
				sContentKey: "video_Prezentation",
				sContentName: "Видео-презентация",
				sContentValue:"https://www.youtube.com/embed/gd1RtXXg2ag?autoplay=1&loop=1&rel=0&mute=1&playlist=gd1RtXXg2ag"
			},
			{
				sContentKey: "text_near_present_1",
				sContentName: "Текст возле презентации 1",
				sContentValue:"Посмотрите короткую"
			},
			{
				sContentKey: "text_near_present_2",
				sContentName: "Текст возле презентации 2",
				sContentValue:"видео-презентацию"
			},
			{
				sContentKey: "text_near_present_3",
				sContentName: "Текст возле презентации 3",
				sContentValue:"о компании"
			},
			{
				sContentKey: "first_button",
				sContentName: "Кнопка под призентациией",
				sContentValue:"Получить подборку предложений"
			},
			{
				sContentKey: "img_near_button",
				sContentName: "Картинка рядом с первой копкой",
				sContentValue:"Получить подборку предложений"
			},
			{
				sContentKey: "header_2_1",
				sContentName: "Заголовок перед тестом 1",
				sContentValue:"Сэкономьте свое время"
			},
			{
				sContentKey: "header_2_2",
				sContentName: "Заголовок перед тестом 2",
				sContentValue:"на поиск, подбор"
			},
			{
				sContentKey: "header_2_3",
				sContentName: "Заголовок перед тестом 3",
				sContentValue:"и просмотр квартир"
			},
			{
				sContentKey: "text_before_test_1",
				sContentName: "Текст под Заголовоком перед тестом 1",
				sContentValue:"Пройдите короткий тест и получите подборку"
			},
			{
				sContentKey: "text_before_test_2",
				sContentName: "Текст под Заголовоком перед тестом 2",
				sContentValue:"идеальных вариантов, которые на"
			},
			{
				sContentKey: "text_before_test_3",
				sContentName: "Текст под Заголовоком перед тестом 3",
				sContentValue:"отвечают"
			},
			{
				sContentKey: "text_before_test_4",
				sContentName: "Текст под Заголовоком перед тестом 4",
				sContentValue:"вашим"
			},
			{
				sContentKey: "text_before_test_5",
				sContentName: "Текст под Заголовоком перед тестом 5",
				sContentValue:"требованиям"
			},
			{
				sContentKey: "text_before_test_5",
				sContentName: "Текст под Заголовоком перед тестом 5",
				sContentValue:"требованиям"
			},
			{
				sContentKey: "quations_1",
				sContentName: "Вопрсы n из 5",
				sContentValue:"Осталось"
			},
			{
				sContentKey: "quations_2",
				sContentName: "Вопрсы n из 5",
				sContentValue:"вопросов из 5"
			},
			{
				sContentKey: "text_left_near_test_1",
				sContentName: "Текст слева от теста 1",
				sContentValue:"И получите подборку лучших квартир,"
			},
			{
				sContentKey: "text_left_near_test_2",
				sContentName: "Текст слева от теста 2",
				sContentValue:"пентхаусов и домов  под ваши заппросы"
			},

			{
				sContentKey: "key_img",
				sContentName: "Изображение слева от теста",
				sContentValue:"/images/quiz-screen/key.png"
			},
			{
				sContentKey: "text_left_near_test_3",
				sContentName: "Текст слева от теста 3",
				sContentValue:"Не знаете что ответить?"
			},
			{
				sContentKey: "text_left_near_test_3",
				sContentName: "Текст слева от теста 3",
				sContentValue:"Введите номер телефона, мы поможем подобрать нужный вариант"
			},
			{
				sContentKey: "second_button_near_test",
				sContentName: "Кнопка слева от теста",
				sContentValue:"Помогите выбрать ответ?"
			},
			{
				sContentKey: "title_under_test_1",
				sContentName: "Заголвок о каталоге 1",
				sContentValue:"В каталоге"
			},
			{
				sContentKey: "title_under_test_2",
				sContentName: "Заголвок о каталоге 2",
				sContentValue:"агентства"
			},
			{
				sContentKey: "info_under_catalog_title_1",
				sContentName: "Информация о каталоге 1",
				sContentValue:"Посмотрите информацию о каждом"
			},
			{
				sContentKey: "info_under_catalog_title_2",
				sContentName: "Информация о каталоге 2",
				sContentValue:"из объектов  и выберите свой"
			},
			{
				sContentKey: "info_under_catalog_title_3",
				sContentName: "Информация о каталоге 3",
				sContentValue:"идеальный вариант"
			},
			{
				sContentKey: "agency-catalog__numbers_1",
				sContentName: "Инфо. о количечтве недвижимости 1",
				sContentValue:"жилых комплексов"
			},
			{
				sContentKey: "agency-catalog__numbers_2",
				sContentName: "Инфо. о количечтве недвижимости 2",
				sContentValue:"домов и земельных участков"
			},
			{
				sContentKey: "title_about_presentation_1",
				sContentName: "Заголовок презентация о недвижимости 1",
				sContentValue:"Скачайте презентацию"
			},
			{
				sContentKey: "title_about_presentation_2",
				sContentName: "Заголовок презентация о недвижимости 2",
				sContentValue:"с лучшими вариантами объектов недвижимости"
			},
			{
				sContentKey: "subtitle_about_presentation",
				sContentName: "Подзаголовок презентация о недвижимости",
				sContentValue:"Вы подробно ознакомитесь с рынком  недвижимости Сочи всего за 10-15 минут"
			},
			{
				sContentKey: "info_right_block_about_presentation",
				sContentName: "Инфо. о презентации справа от заголовка",
				sContentValue:"Вы увидите актуальную информацию по каждому жилому комплексу и сможете их сравнить"
			},
			{
				sContentKey: "download_form_title_1",
				sContentName: "Заголовок формы для скачивания презентации_1",
				sContentValue:"Скачать презентацию"
			},
			{
				sContentKey: "download_form_title_2",
				sContentName: "Заголовок формы для скачивания презентации_2",
				sContentValue:"по всем ЖК"
			},
			{
				sContentKey: "download_form_button",
				sContentName: "Кнопка скачать в форме для скачивания",
				sContentValue:"Скачать презентацию"
			},
			{
				sContentKey: "link_to_catalog_1",
				sContentName: "Ссылка на каталог 1",
				sContentValue:"Посмотреть каталог"
			},
			{
				sContentKey: "link_to_catalog_2",
				sContentName: "Ссылка на каталог 2",
				sContentValue:"на сайте в онлайне"
			},
			{
				sContentKey: "help_with_mortgage",
				sContentName: "Помощь с ипотекой",
				sContentValue:"Поможем в офомлении ипотеки"
			},
			{
				sContentKey: "Buy_apartment_title",
				sContentName: "Заголовок помощь с покупкой квартиры",
				sContentValue:"Не только подберем квартиру, но и поможем приобрести ее"
			},
			{
				sContentKey: "mortgage_probability",
				sContentName: "Вероятность ипотеки",
				sContentValue:"Вероятность одобрения ипотеки"
			},
			{
				sContentKey: "subtitle_odobrenie_ipoteki_1",
				sContentName: "Подзаголовок одобрение ипотеки 1",
				sContentValue:"одобрение ипотеки"
			},
			{
				sContentKey: "subtitle_odobrenie_ipoteki_2",
				sContentName: "Подзаголовок одобрение ипотеки 2",
				sContentValue:"несмотря на плохую"
			},
			{
				sContentKey: "subtitle_odobrenie_ipoteki_3",
				sContentName: "Подзаголовок одобрение ипотеки 3",
				sContentValue:"кредитную историю"
			},
			{
				sContentKey: "info_ipoteka_1",
				sContentName: "Инф. про ипотеку 1",
				sContentValue:"Деньгами можно распорядиться более выгодно,"
			},
			{
				sContentKey: "info_ipoteka_2",
				sContentName: "Инф. про ипотеку 2",
				sContentValue:"чем сразу вкладывать их в квартиру"
			},
			{
				sContentKey: "money_img",
				sContentName: "Картинка с деньгами",
				sContentValue:"/images/money_kredit.png"
			},
			{
				sContentKey: "subtitle_Kislorod_i_banki",
				sContentName: "Подзаголовок отношения с банками",
				sContentValue:"Вы экономите деньги благодаря партнерским отношениям между «Кислород» и банками"
			},
			{
				sContentKey: "info_block_under_money_img_1",
				sContentName: "Инф. под подзаголовком об отношениях с банками 1",
				sContentValue:"Снижение на 0,5-1,0% процентных ставок"
			},
			{
				sContentKey: "info_block_under_money_img_2",
				sContentName: "Инф. под подзаголовком об отношениях с банками 2",
				sContentValue:"Отмена запрета на досрочное погашение"
			},
			{
				sContentKey: "info_block_under_money_img_2",
				sContentName: "Инф. под подзаголовком об отношениях с банками 3",
				sContentValue:"Согласование сложных ситуаций с банками"
			},
			{
				sContentKey: "key_kredit_img",
				sContentName: "Картинка с ключем (ипотека)",
				sContentValue:"/images/key_kredit.png"
			},
			{
				sContentKey: "link_to_catalog_2",
				sContentName: "Ссылка на каталог 2",
				sContentValue:"на сайте в онлайне"
			},
			{
				sContentKey: "button_about_ipoteka",
				sContentName: "Кнопка для вероятности ипотеки",
				sContentValue:"Узнать вероятность одобрения ипотеки"
			},

			{
				sContentKey: "button_about_ipoteka",
				sContentName: "Кнопка для вероятности ипотеки",
				sContentValue:"Узнать вероятность одобрения ипотеки"
			},
			{
				sContentKey: "info_abot_ipoteka_test",
				sContentName: "Инф. про тест на вероятность ипотеки",
				sContentValue:"Пройдите простой тест и узнайте вероятность одобрения ипотеки банками-партнерами онлайн за 2 минуты"
			},
			{
				sContentKey: "info_under_button_about_ipoteka",
				sContentName: "Описание кнопки для вероятности ипотеки",
				sContentValue:"Узнать вероятность одобрения ипотеки"
			},
			{
				sContentKey: "change_apartments_title",
				sContentName: "Загаловок об обмене квартиры",
				sContentValue:"Поменяем вашу квартиру на новую"
			},
			{
				sContentKey: "change_apartments_subtitle",
				sContentName: "Подзагаловок об обмене квартиры",
				sContentValue:"Если перед покупкой нового жилья вам необходимо продать предыдущую квартиру, мы справимся с этим."
			},
			{
				sContentKey: "change_apartments_title_right_block_1",
				sContentName: "Блок справа от заголовке про обмен 1",
				sContentValue:"По программе"
			},
			{
				sContentKey: "change_apartments_title_right_block_1",
				sContentName: "Блок справа от заголовке про обмен 1",
				sContentValue:"Трейд-Ин"
			},
			{
				sContentKey: "img_rub_coin",
				sContentName: "Картинка монеты",
				sContentValue:"/images/apartment/rub_coin.png"
			},
			{
				sContentKey: "pay_title",
				sContentName: "Заголовок про оплату",
				sContentValue:"Используйте любые виды оплаты для покупки квартиры"
			},
			{
				sContentKey: "cash_1",
				sContentName: "Оплата наличными 1",
				sContentValue:"Наличные"
			},
			{
				sContentKey: "cash_2",
				sContentName: "Оплата наличными 2",
				sContentValue:"Получите скидку"
			},
			{
				sContentKey: "cash_3",
				sContentName: "Оплата наличными 3",
				sContentValue:"до 10%"
			},
			{
				sContentKey: "ipoteka_1",
				sContentName: "про ипотеку 1",
				sContentValue:"Ипотека"
			},
			{
				sContentKey: "ipoteka_2",
				sContentName: "про ипотеку 2",
				sContentValue:"Получите выгоду 1-2%"
			},
			{
				sContentKey: "ipoteka_dop_info_1",
				sContentName: "Доп. Инфо. про ипотеку 1",
				sContentValue:"Работаем с 20 банками"
			},
			{
				sContentKey: "ipoteka_dop_info_2",
				sContentName: "Доп. Инфо. про ипотеку 2",
				sContentValue:"Оформим за 24 часа"
			},
			{
				sContentKey: "ipoteka_dop_info_3",
				sContentName: "Доп. Инфо. про ипотеку 3",
				sContentValue:"По 2-м документам"
			},
			{
				sContentKey: "capital_1",
				sContentName: "О капитале 1",
				sContentValue:"Материнский"
			},
			{
				sContentKey: "capital_2",
				sContentName: "О капитале 2",
				sContentValue:"и военный капитал"
			},
			{
				sContentKey: "capital_3",
				sContentName: "О капитале 3",
				sContentValue:"Поможем получить"
			},
			{
				sContentKey: "rosrochka 1",
				sContentName: "О россрочке 1",
				sContentValue:"Рассрочка"
			},
			{
				sContentKey: "rosrochka 2",
				sContentName: "О россрочке 2",
				sContentValue:"Без первоначального взноса"
			},
			{
				sContentKey: "ocenka_title",
				sContentName: "Заголовок об оценке",
				sContentValue:"Проведем бесплатную оценку вашей квартиры для обмена на новую"
			},
			{
				sContentKey: "vy_poluchite_title",
				sContentName: "Также получите:",
				sContentValue:"Так же вы получите:"
			},
			{
				sContentKey: "vy_poluchite_block_1_1",
				sContentName: "Также получите: блок 1.1",
				sContentValue:"Личного брокера"
			},
			{
				sContentKey: "vy_poluchite_block_1_2",
				sContentName: "Также получите: блок 1.2",
				sContentValue:"по продаже квартиры"
			},
			{
				sContentKey: "vy_poluchite_block_2_1",
				sContentName: "Также получите: блок 2.1",
				sContentValue:"Сроки по продаже"
			},
			{
				sContentKey: "vy_poluchite_block_2_2",
				sContentName: "Также получите: блок 2.2",
				sContentValue:"старой квартиры"
			},
			{
				sContentKey: "vy_poluchite_block_3_1",
				sContentName: "Также получите: блок 3.1",
				sContentValue:"Презентацию"
			},
			{
				sContentKey: "vy_poluchite_block_3_2",
				sContentName: "Также получите: блок 3.2",
				sContentValue:"с планировками"
			},
			{
				sContentKey: "manager_call_title",
				sContentName: "заголовок в форме со звонком менеджера",
				sContentValue:"Менеджер перезвонит вам чтобы уточнить подробности по квартире"
			},
			{
				sContentKey: "button_na_audit",
				sContentName: "Кнопка записаться на аудит",
				sContentValue:"Записаться на аудит"
			},
			{
				sContentKey: "stoimost_nedvijimosti_title_1",
				sContentName: "Заголовок стоимость недвижимости 1",
				sContentValue:"Стоимость недвижимости"
			},
			{
				sContentKey: "stuomost_nedvijimosti_title_2",
				sContentName: "Заголовок стоимость недвижимости 2",
				sContentValue:"в г. Сочи  выросла на 51%"
			},
			{
				sContentKey: "stoimost_nedvijimosti_title_3",
				sContentName: "Заголовок стоимость недвижимости 3",
				sContentValue:"за последние 3 года"
			},
			{
				sContentKey: "stoimost_nedvijimosti_title_4",
				sContentName: "Заголовок стоимость недвижимости 4",
				sContentValue:"И будет рости за счет развития"
			},
			{
				sContentKey: "stoimost_nedvijimosti_title_5",
				sContentName: "Заголовок стоимость недвижимости 5",
				sContentValue:"региона еще ближайшие 3-5 лет"
			},
			{
				sContentKey: "block_under_stoimost_nedvijimosti_title_1",
				sContentName: "блок под заголовоком стоимость недвижимости 1",
				sContentValue:"Все это время ее можно"
			},
			{
				sContentKey: "block_under_stoimost_nedvijimosti_title_2",
				sContentName: "блок под заголовоком стоимость недвижимости 2",
				sContentValue:"сдавать в аренду и получать"
			},
			{
				sContentKey: "block_under_stoimost_nedvijimosti_title_3",
				sContentName: "блок под заголовоком стоимость недвижимости 3",
				sContentValue:"дополнительную прибыль"
			},
			{
				sContentKey: "block_about_profit_1",
				sContentName: "Блок о выгоде сдачи в аренду 1",
				sContentValue:"Через 5 лет вы сможете продать квартиру и заработать до"
			},
			{
				sContentKey: "block_about_profit_2",
				sContentName: "Блок о выгоде сдачи в аренду 2",
				sContentValue:"от стоимости,"
			},
			{
				sContentKey: "block_about_profit_3",
				sContentName: "Блок о выгоде сдачи в аренду 3",
				sContentValue:"дополнительно"
			},
			{
				sContentKey: "company_activity_title_1",
				sContentName: "Заголовок о деятельности компании 1",
				sContentValue:"Деятельность компании"
			},
			{
				sContentKey: "company_activity_title_2",
				sContentName: "Заголовок о деятельности компании 2",
				sContentValue:"подтверждена всеми необходимыми"
			},
			{
				sContentKey: "company_activity_title_3",
				sContentName: "Заголовок о деятельности компании 3",
				sContentValue:"лицензиями и допусками"
			},
			{
				sContentKey: "documentattion_Krasnodar_1",
				sContentName: "Документация в краснодаре 1",
				sContentValue:"В Краснодарском крае вопрос"
			},
			{
				sContentKey: "documentattion_Krasnodar_2",
				sContentName: "Документация в краснодаре 2",
				sContentValue:"с документацией стоит особенно остро."
			},
			{
				sContentKey: "block_right_company_activity_title_1",
				sContentName: "Блок справа от заголовока о деятельности компании 1",
				sContentValue:"Мы заранее заботимся о спокойствии"
			},
			{
				sContentKey: "block_right_company_activity_title_2",
				sContentName: "Блок справа от заголовока о деятельности компании 2",
				sContentValue:"наших клиентов и получаем все разрешительны документы еще до начала продаж и сдачи объекта"
			},
			{
				sContentKey: "golden_img",
				sContentName: "Картинка слитка",
				sContentValue:"/images/icons/ribbon_gold.png"
			},
			{
				sContentKey: "jilaya_ploshad_title_1",
				sContentName: "Заголовок о жилой площади 1",
				sContentValue:"…За 10 лет мы построили и сдали больше 40 000 м"
			},
			{
				sContentKey: "jilaya_ploshad_title_2",
				sContentName: "Заголовок о жилой площади 2",
				sContentValue:"жилой площади"
			},
			{
				sContentKey: "razresh_documentation_1",
				sContentName: "Разрешительная документация 1",
				sContentValue:"Мы знаем, что разрешительная документация"
			},
			{
				sContentKey: "razresh_documentation_2",
				sContentName: "Разрешительная документация 2",
				sContentValue:"для застройщика — это больная тема в нашем регионе."
			},
			{
				sContentKey: "razresh_documentation_3",
				sContentName: "Разрешительная документация 3",
				sContentValue:"Мы тщательно проверяем объект прежде, чем предложить его вам"
			},
			{
				sContentKey: "company_rukovoditeil_1",
				sContentName: "Руководитель компании 1",
				sContentValue:"Скрипко Иван"
			},
			{
				sContentKey: "company_rukovoditeil_2",
				sContentName: "Руководитель компании 2",
				sContentValue:"Борисович"
			},
			{
				sContentKey: "company_rukovoditeil_about_1",
				sContentName: "O руководителе компании 1",
				sContentValue:"Руководитель компании более"
			},
			{
				sContentKey: "company_rukovoditeil_about_2",
				sContentName: "О руководителе компании 2",
				sContentValue:"лет"
			},
			{
				sContentKey: "company_rukovoditeil_about_3",
				sContentName: "О руководителе компании 3",
				sContentValue:"в строительстве"
			},
			{
				sContentKey: "otdel_rukovoditeil_1",
				sContentName: "Руководитель отдела продаж 1",
				sContentValue:"Балынская"
			},
			{
				sContentKey: "otdel_rukovoditeil_2",
				sContentName: "Руководитель отдела продаж 2",
				sContentValue:"Александра"
			},
			{
				sContentKey: "otdel_rukovoditeil_about_1",
				sContentName: "O Руководителе отдела продаж 1",
				sContentValue:"Руководитель отдела"
			},
			{
				sContentKey: "otdel_rukovoditeil_about_2",
				sContentName: "O Руководителе отдела продаж 2",
				sContentValue:"продаж"
			},
			{
				sContentKey: "ask_quations_title_1",
				sContentName: "Заголовок задать вопрос специаличту 1",
				sContentValue:"Задайте вопрос нашему лучшему специалисту"
			},
			{
				sContentKey: "ask_quations_title_2",
				sContentName: "Заголовок задать вопрос специалисту 2",
				sContentValue:"Так же вы получите:"
			},
			{
				sContentKey: "block_under_ask_quations_title_1_1",
				sContentName: "Блок под заголовоком задать вопрос специалисту 1.1",
				sContentValue:"Презентацию"
			},
			{
				sContentKey: "block_under_ask_quations_title_1_2",
				sContentName: "Блок под заголовоком задать вопрос специалисту 1.2",
				sContentValue:"с каталогом"
			},
			{
				sContentKey: "block_under_ask_quations_title_1_3",
				sContentName: "Блок под заголовоком задать вопрос специалисту 1.3",
				sContentValue:"недвижимости"
			},
			{
				sContentKey: "block_under_ask_quations_title_2_1",
				sContentName: "Блок под заголовоком задать вопрос специалисту 2.1",
				sContentValue:"Условия"
			},
			{
				sContentKey: "block_under_ask_quations_title_2_2",
				sContentName: "Блок под заголовоком задать вопрос специалисту 2.2",
				sContentValue:"оформления"
			},
			{
				sContentKey: "block_under_ask_quations_title_2_3",
				sContentName: "Блок под заголовоком задать вопрос специалисту 2.3",
				sContentValue:"рассрочки"
			},
			{
				sContentKey: "block_under_ask_quations_title_3_1",
				sContentName: "Блок под заголовоком задать вопрос специалисту 3.1",
				sContentValue:"Личного менеджера"
			},
			{
				sContentKey: "block_under_ask_quations_title_3_2",
				sContentName: "Блок под заголовоком задать вопрос специалисту 3.2",
				sContentValue:"по подбору"
			},
			{
				sContentKey: "block_under_ask_quations_title_3_3",
				sContentName: "Блок под заголовоком задать вопрос специалисту 3.3",
				sContentValue:"квартиры"
			},
			{
				sContentKey: "title_ask_quations_form",
				sContentName: "Заголовок в форме для вопросов",
				sContentValue:"Как вам удобно получить консультацию и материалы?"
			},
			{
				sContentKey: "button_ask_quations",
				sContentName: "Кнопка задать вопрос",
				sContentValue:"Задать вопрос специалисту"
			}


		]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('content', {});
  }
};
