export type Locale = "ru" | "en";

export const RUSSIAN_SPEAKING_COUNTRIES = new Set([
  "RU", // Russia
  "UA", // Ukraine
  "BY", // Belarus
  "KZ", // Kazakhstan
  "KG", // Kyrgyzstan
  "UZ", // Uzbekistan
  "TJ", // Tajikistan
  "TM", // Turkmenistan
  "MD", // Moldova
  "AM", // Armenia
  "AZ", // Azerbaijan
  "GE", // Georgia
]);

export const translations = {
  ru: {
    nav: {
      philosophy: "Идея",
      howTreasuryGrows: "Как это должно работать",
      treasury: "План",
      token: "Токеномика (черновик)",
      manifesto: "Манифест",
      faq: "FAQ",
      contact: "Контакты",
      buyToken: "Хочу, чтобы это состоялось",
    },
    social: {
      menuTitle: "Обсудить идею",
      menuSubtitle: "Где можно высказаться и покритиковать",
      twitter: "Twitter / X",
      telegram: "Telegram-канал",
      youtube: "YouTube",
      reddit: "Reddit",
      email: "Написать на почту",
    },
    disclaimer: {
      label: "Важно",
      short:
        "Это идея на стадии обсуждения. Токена не существует, ничего не продаётся и деньги не собираются. Если токен когда-нибудь появится, он не будет инвестиционным продуктом и не даст прав на активы.",
    },
    subscribe: {
      kicker: "🙋 Хотите, чтобы это состоялось?",
      title: "Оставьте почту — это и есть мой главный ответ на вопрос «нужно ли это»",
      description:
        "Я решаю, стоит ли вкладывать свои деньги в первый слиток. Каждый, кто оставит почту, — голос «да, это интересно». Напишу, когда приму решение и что изменил по вашей критике.",
      points: [
        "Напишу, покупаю ли я слиток или отказываюсь от идеи",
        "Расскажу, что изменил после ваших замечаний",
        "Никакого спама и никаких продаж — отписка в один клик",
      ],
      privacy:
        "Почта используется только для новостей проекта. Не передаю её третьим лицам.",
    },
    hero: {
      kicker: "Стадия идеи · Ничего не продаётся · Нужно ваше мнение",
      description:
        "Я собираюсь купить 1 кг золота на свои деньги и построить вокруг него открытую казну реальных активов, где каждая покупка публикуется с документами, а что покупать дальше, решают вместе с сообществом. Прежде чем тратить деньги, хочу понять: нужно ли это кому-то, кроме меня?",
      phrases: [
        "Я собираюсь купить 1 кг золота — до того, как появится хоть один токен.",
        "Сначала актив и документы, потом всё остальное. Не наоборот.",
        "Это пока идея. Скажите, где она ломается.",
      ],
      liveLabel: "Статус проекта",
      liveBadge: "Идея",
      offlineTitle: "Сейчас",
      offlineBody: "Идея обсуждается. Ничего не куплено и не продаётся.",
      watchOnYoutube: "Обсудить в X",
      streamChecking: "—",
      streamLatest: "—",
      videoPlaceholderLabel: "Статус",
      videoPlaceholderTitle: "Что есть сейчас",
      videoPlaceholderBody: "Идея, черновик модели и этот сайт.",
      ctaTreasury: "Что я планирую",
      ctaManifesto: "Читать манифест",
      statusItems: [
        { label: "Стадия", value: "идея, собираю мнения" },
        { label: "Золото", value: "ещё не куплено" },
        { label: "Токен", value: "не существует" },
        { label: "Собрано с людей", value: "0" },
      ],
      discussCta: "Обсудить в X",
    },
    teasers: {
      treasury: {
        title: "🗺️ План",
        body: "Что я собираюсь купить первым, как это будет задокументировано и чего пока нет. Честно и по пунктам.",
        cta: "Открыть план",
      },
      token: {
        title: "🪙 Токеномика (черновик)",
        body: "Как могло бы выглядеть распределение, если дойдёт до токена. Это черновик для критики, а не предложение.",
        cta: "Покритиковать черновик",
      },
      manifesto: {
        title: "🌍 Манифест",
        body: "Почему мне это пришло в голову, чем это отличается от PAXG и XAUT и что меня самого смущает.",
        cta: "Читать манифест",
      },
    },
    philosophy: {
      kicker: "🌉 Идея",
      title: "Сначала актив — потом всё остальное",
      description:
        "Почему я думаю, что порядок действий важнее красивых обещаний.",
      blocks: [
        {
          title: "⚠️ Проблема, которую я вижу",
          paragraphs: [
            "Большинство криптопроектов — это название и обещание. Сначала токен, потом сбор денег, потом, может быть, покупка чего-то реального. Когда новые люди перестают приходить, за проектом ничего не остаётся.",
            "Я сам терял на этом деньги. Поэтому хочу проверить, можно ли сделать наоборот.",
          ],
        },
        {
          title: "🥇 Идея: начать с реального золота",
          paragraphs: [
            "План — купить 1 кг золота на собственные деньги до того, как появится хоть один токен. Слиток, сертификат и документ покупки публикуются, чтобы любой мог сверить серийный номер.",
            "Пока это план. Я ещё ничего не купил и хочу сначала услышать критику.",
          ],
        },
        {
          title: "🏗️ Казна, которая растёт в открытую",
          paragraphs: [
            "Если идея окажется нужной, казна пополняется новыми реальными активами — каждый с документами.",
            "Что покупать следующим, обсуждается публично с теми, кто следит за проектом, — до того, как деньги потрачены.",
          ],
        },
        {
          title: "🌐 Почему сейчас: тренд RWA",
          paragraphs: [
            "Токенизация реальных активов — заметный тренд. Но большинство проектов прячут активы за отчётами и кастодианами.",
            "Мне интересно, нужна ли людям другая модель: маленькая, открытая, с одним человеком, который показывает всё. Или это никому не нужно — тоже ответ.",
          ],
        },
      ],
    },
    comparison: {
      kicker: "🔍 Чем это должно отличаться",
      title: "Обычный порядок и тот, который я предлагаю",
      description:
        "Разница не в обещаниях, а в том, что происходит первым.",
      others: {
        title: "⚠️ Как обычно на рынке",
        items: [
          "Сначала токен и сбор денег, актив — когда-нибудь потом",
          "О резервах заявляют, а проверить их независимо нельзя",
          "Ценность держится на вере и притоке новых людей",
          "Решения о деньгах принимаются за закрытыми дверями",
        ],
      },
      us: {
        title: "✅ Как я хочу сделать",
        items: [
          "🥇 Сначала покупаю золото на свои деньги — до любого токена",
          "🧾 Публикую сертификат, серийный номер и документ покупки",
          "🗣️ Следующую покупку обсуждаем открыто, до того как деньги ушли",
          "🔓 Что есть, а чего нет — отдельным списком, без прикрас",
        ],
      },
    },
    treasuryGrowth: {
      kicker: "🔁 Как это должно работать",
      title: "Цикл, который я хочу построить",
      description:
        "Это модель, а не работающая система. Ни один шаг пока не запущен — я хочу, чтобы её покритиковали до запуска.",
      steps: [
        {
          title: "🥇 Первый слиток",
          body: "Покупаю 1 кг золота на свои деньги и публикую документы. Пока не сделано — это первый шаг, если идея окажется нужной.",
        },
        {
          title: "💶 Средства проекта",
          body: "Позже проект мог бы аккумулировать средства, в том числе от токена. Это под вопросом и обсуждается.",
        },
        {
          title: "🗳️ Сообщество обсуждает, что дальше",
          body: "Какой актив покупать следующим — обсуждается открыто. Механизма голосования нет: это идея.",
        },
        {
          title: "🏦 Покупка реального актива",
          body: "На эти средства покупается следующий реальный актив и оформляется официально.",
        },
        {
          title: "🧾 Документы публикуются",
          body: "Фото, серийный номер, сертификат и документ покупки — в открытом доступе, персональные данные скрыты.",
        },
        {
          title: "📈 Казна растёт публично",
          body: "Каждый шаг можно проверить. Никаких обещаний прибыли.",
        },
      ],
      cycleNote:
        "🔄 Это модель для обсуждения. Ничего из этого пока не существует, деньги не собираются. Если вы видите, где она ломается, — напишите, ради этого сайт и сделан.",
    },
    manifesto: {
      kicker: "🌍 Моя позиция",
      statement:
        "Я не хочу строить токен веры. Я хочу понять, нужна ли людям казна, которую можно проверить.",
      description:
        "Я один человек. Я собираюсь вложить свои деньги в первый актив. Но сначала хочу услышать, что вы об этом думаете.",
      tags: ["💡 Идея", "🗣️ Открыто к критике", "👤 Один человек"],
      cta: "Читать полный манифест",
    },
    ownMoney: {
      kicker: "💰 Чьи деньги",
      title: "Первый слиток — только на мои деньги",
      paragraphs: [
        "Если я решу запускать проект, первый килограмм золота будет куплен на мои собственные деньги, до того как появится хоть что-то, что можно купить. Никакого сбора средств до этого не будет.",
        "Поэтому мне и важно понять заранее, нужно ли это кому-то. Каждое мнение, каждая критика и каждая оставленная почта — часть этого решения.",
      ],
      facts: [
        { label: "Первый актив", value: "1 кг золота" },
        { label: "Чьи деньги", value: "мои собственные" },
        { label: "Собрано с людей", value: "0" },
        { label: "Статус", value: "решаю" },
      ],
      note: "Цену не указываю: золото дорожает и дешевеет, точная сумма будет в документе покупки, если до неё дойдёт.",
    },
    trust: {
      kicker: "🛡️ На чём держится идея",
      title: "Почему золото, прозрачность и честность про недостатки",
      description: "Три вещи, без которых проект не имеет смысла.",
      panels: [
        {
          title: "🥇 Почему старт именно с золота",
          body: "Золото — понятный актив: его физическое наличие можно показать, задокументировать и проверить по серийному номеру.",
        },
        {
          title: "🔍 Проверяемость вместо обещаний",
          body: "Каждая покупка должна публиковаться полностью: фото, серийный номер, сертификат, документ покупки. Не отчёт о покупке, а сама покупка.",
        },
        {
          title: "⚙️ Честность про недостатки",
          body: "У проекта нет команды, юрлица, аудита и токена. Это написано прямо — и будет написано, пока не изменится.",
        },
      ],
    },
    roadmap: {
      kicker: "🗺️ Дорожная карта",
      title: "Сейчас — стадия идеи",
      statusLabels: { done: "Сделано", now: "Сейчас", next: "Дальше" },
      steps: [
        {
          status: "done",
          title: "💡 Этап 00 — Идея",
          body: "Сформулирована модель, сделан этот сайт.",
        },
        {
          status: "now",
          title: "🗣️ Этап 01 — Обсуждение",
          body: "Собираю мнения и критику: нужно ли это, где модель ломается, кто хотел бы участвовать.",
        },
        {
          status: "next",
          title: "🥇 Этап 02 — Первый актив",
          body: "Если интерес подтвердится — покупка 1 кг золота на мои деньги и публикация документов.",
        },
        {
          status: "next",
          title: "🪙 Этап 03 — Решение о токене",
          body: "Только после первого актива и только если сообщество сочтёт это нужным.",
        },
      ],
    },
    faq: {
      kicker: "❓ FAQ",
      title: "Вопросы, которые мне уже задают",
      items: [
        {
          question: "🎯 Вы уже купили золото?",
          answer:
            "Нет. Я собираюсь это сделать и сначала хочу понять, нужен ли такой проект людям. Если интереса не будет, я его не запущу.",
        },
        {
          question: "🪙 Можно ли что-то купить или вложить?",
          answer:
            "Нет. Токена не существует, сбора денег нет. Если вам где-то предлагают «войти пораньше» в AUREUM LINK — это не я.",
        },
        {
          question: "🗳️ Чем я могу помочь?",
          answer:
            "Высказаться. Напишите, что вам нравится, что смущает и что бы вы изменили. Оставьте почту, если хотите, чтобы проект состоялся.",
        },
        {
          question: "💎 Почему не просто купить PAXG?",
          answer:
            "Хороший вопрос, и я хочу услышать ваш ответ. PAXG — право требования на золото у кастодиана. Я думаю о другом: об открытой казне, где видно каждую покупку и где следующую выбирают вместе. Нужно ли это — как раз и проверяю.",
        },
        {
          question: "🧭 Что будет, если идея никому не нужна?",
          answer:
            "Я не куплю слиток под проект и закрою его. Это тоже честный результат.",
        },
      ],
    },
    treasuryPage: {
      kicker: "🗺️ План",
      title: "Что я собираюсь сделать и чего пока нет",
      description:
        "Здесь будет публичный список реальных активов проекта. Сейчас в нём только план первой покупки — ничего ещё не куплено.",
      liveLabel: "Стадия идеи",
      status: {
        now: {
          title: "✅ Что есть сейчас",
          items: [
            "Идея и черновик модели",
            "Этот сайт",
            "Открытое обсуждение в X и Telegram",
          ],
        },
        notYet: {
          title: "🚧 Чего ещё нет",
          items: [
            "Золото не куплено",
            "Нет токена, контракта и кошелька казны",
            "Нет юрлица, аудита и команды",
            "Деньги не собираются",
          ],
        },
        next: {
          title: "🎯 Что дальше",
          items: [
            "Собрать мнения и критику",
            "Решить, запускать ли проект",
            "Если да — купить 1 кг золота и опубликовать документы",
          ],
        },
      },
      assetsTitle: "Первый актив (план)",
      fields: {
        serial: "Серийный номер",
        purchaseDate: "Дата покупки",
        purchasePrice: "Цена покупки",
        currentValue: "Текущая стоимость",
        currentValueNote: "появится после покупки",
        vendor: "Продавец",
        status: "Статус",
      },
      statusValues: {
        owned: "В казне",
        pending: "Планируется · не куплено",
      },
      proofsTitle: "Документы",
      proofsIntro:
        "После покупки здесь будут опубликованы сертификат, документ покупки и фото слитка с серийным номером.",
      zoom: "Открыть крупнее",
      close: "Закрыть",
      redactedNote: "",
      protectedNote: "",
      photoPlaceholder: "Слиток ещё не куплен",
      backHome: "На главную",
    },
    tokenPage: {
      kicker: "🪙 Токеномика — черновик",
      liveBadge: "Токена не существует",
      title: "Как могло бы выглядеть распределение — черновик для критики",
      description:
        "Это не предложение и не продажа. Это черновик, который я хочу показать до любых решений: если что-то здесь выглядит подозрительно — скажите.",
      supplyLabel: "Общая эмиссия (черновик)",
      supplyValue: "100 000 000 AUR",
      platformLabel: "Платформа (черновик)",
      platformValue: "Base · ERC-20",
      standardNote:
        "Решение о токене будет приниматься только после первого актива и обсуждения. Его может не быть вовсе.",
      allocationTitle: "Распределение (черновик)",
      allocation: [
        {
          label: "Резерв проекта",
          percent: 40,
          note: "Финансирование покупок реальных активов. Кошелёк был бы публичным.",
        },
        {
          label: "Публичная продажа",
          percent: 30,
          note: "Под вопросом: нужна ли она вообще — обсуждается.",
        },
        {
          label: "Ликвидность",
          percent: 12,
          note: "Ликвидность на бирже с блокировкой.",
        },
        {
          label: "Основатель",
          percent: 10,
          note: "Вестинг 4 года, клифф 1 год. Это много или мало? Скажите.",
        },
        {
          label: "Сообщество",
          percent: 8,
          note: "Тем, кто помогает проекту.",
        },
      ],
      purposeTitle: "Зачем вообще мог бы понадобиться токен",
      purpose: [
        "Способ участвовать в проекте и поддерживать его",
        "Единица, вокруг которой строится публичная история казны",
        "Возможно, он не нужен вовсе — это тоже вариант",
      ],
      purposeIsNotTitle: "Чем токен НЕ будет",
      purposeIsNot: [
        "Не инвестиционный продукт",
        "Не доля и не право на активы",
        "Не обещание прибыли или дохода",
      ],
      contractLabel: "Адрес контракта",
      contractPlaceholder: "не существует",
      explorerNote:
        "Контракта нет. Если кто-то показывает вам адрес «токена AUREUM LINK» — это не я.",
    },
    manifestoPage: {
      kicker: "🌍 Манифест",
      title: "Один человек, одна идея, открытое обсуждение",
      lead: "Я собираюсь купить 1 кг золота на свои деньги и построить вокруг него открытую казну. Прежде чем это сделать, хочу услышать, что вы думаете.",
      sections: [
        {
          title: "Проблема",
          paragraphs: [
            "Крипторынок устал от обещаний. Токены появляются и исчезают, а за большинством нет ничего, что можно проверить.",
            "Я сам терял деньги на таком проекте — не на откровенном мошенничестве, а на обычном, у которого под капотом ничего не было.",
          ],
        },
        {
          title: "Что я хочу сделать",
          paragraphs: [
            "Открытую казну реальных активов. Начать с одного килограмма золота, купленного на мои деньги, до появления любого токена. Опубликовать каждый документ.",
            "Следующие покупки обсуждать открыто — с теми, кто следит за проектом.",
          ],
        },
        {
          title: "Что есть сейчас",
          paragraphs: [
            "Идея, черновик модели и этот сайт. Золото не куплено, токена нет, денег я ни у кого не беру.",
            "Сейчас я собираю мнения: нужно ли это, кто хотел бы участвовать, где модель ломается.",
          ],
        },
        {
          title: "Чем это отличается от PAXG и XAUT",
          paragraphs: [
            "PAXG и XAUT — токены с привязкой 1:1 к золоту у централизованных кастодианов. Это регулируемое право требования, и это хорошо работает.",
            "Я думаю о другом: о маленькой открытой казне, где видна каждая покупка и где следующую выбирают вместе. Без привязки и без права требования. Нужно ли такое людям — главный вопрос.",
          ],
        },
      ],
      pullquote: "Не верьте на слово. И мне тоже — критикуйте.",
      vsTitle: "Где я вижу разницу",
      them: {
        title: "⚠️ PAXG / XAUT и подобные",
        items: [
          "Золото у кастодиана — нужно доверять хранителю",
          "Прозрачность — периодические аттестации",
          "Погашение через KYC и минимальные суммы",
          "Закрытые решения о резервах",
        ],
      },
      us: {
        title: "💡 Идея AUREUM LINK",
        items: [
          "Каждая покупка публикуется полностью",
          "Следующий актив обсуждается открыто",
          "Ничего не нужно погашать: это не право требования",
          "Один автор в открытую, честно про то, чего нет",
        ],
      },
      planTitle: "План",
      plan: [
        {
          title: "Сделано",
          body: "Идея, модель и сайт.",
        },
        {
          title: "Сейчас",
          body: "Собираю мнения и критику в X и Telegram.",
        },
        {
          title: "Дальше",
          body: "Если интерес подтвердится — покупка первого слитка и публикация документов.",
        },
      ],
      socialTitle: "Поделиться идеей",
      socialLead:
        "Если идея вам интересна — поделитесь ею. Чем больше людей выскажется, тем честнее будет решение.",
      socialHint: "Скопируй и опубликуй у себя",
      socialText:
        "Человек собирается купить 1 кг золота на свои деньги до появления любого токена и построить открытую казну, где видна каждая покупка. Пока это идея — и он спрашивает, нужно ли это. aureum-link.com #AUREUMLINK #RWA",
      copy: "Скопировать текст",
      copied: "Скопировано",
      backHome: "На главную",
    },
    legalPage: {
      kicker: "⚖️ Дисклеймер",
      title: "Что такое AUREUM LINK сейчас — и чем он не является",
      intro: "Коротко и простыми словами.",
      isNotTitle: "AUREUM LINK НЕ является",
      isNot: [
        "инвестиционным продуктом, ценной бумагой или финансовым инструментом",
        "сбором средств, предпродажей или приёмом вкладов",
        "обещанием прибыли, дохода или роста стоимости",
        "правом требования на золото или другой актив",
        "источником процентов, дивидендов или любых выплат",
        "действующим токеном — его не существует",
      ],
      isTitle: "Сейчас это",
      is: [
        "идея на стадии обсуждения",
        "план купить 1 кг золота на личные деньги автора",
        "личный проект одного человека",
        "место, где можно покритиковать модель до её запуска",
      ],
      noFundraisingTitle: "Сбора денег нет",
      noFundraising:
        "Проект не собирает средства и не принимает вклады. Золото не куплено, токена не существует, и никто не должен ничего никуда переводить. Если вам где-то предлагают «войти пораньше» в AUREUM LINK — это не я.",
      notAdvice:
        "Материалы сайта носят информационный характер и не являются инвестиционной, юридической или налоговой консультацией.",
      backHome: "На главную",
    },
  },

  en: {
    nav: {
      philosophy: "The idea",
      howTreasuryGrows: "How it should work",
      treasury: "The plan",
      token: "Tokenomics (draft)",
      manifesto: "Manifesto",
      faq: "FAQ",
      contact: "Contact",
      buyToken: "I want this to happen",
    },
    social: {
      menuTitle: "Discuss the idea",
      menuSubtitle: "Where to share your opinion and criticism",
      twitter: "Twitter / X",
      telegram: "Telegram Channel",
      youtube: "YouTube",
      reddit: "Reddit",
      email: "Email",
    },
    disclaimer: {
      label: "Important",
      short:
        "This is an idea under discussion. No token exists, nothing is for sale and no money is being collected. If a token ever exists, it will not be an investment product and will grant no rights to any assets.",
    },
    subscribe: {
      kicker: "🙋 Want this to happen?",
      title: "Leave your email — it's my main answer to \"does anyone need this?\"",
      description:
        "I'm deciding whether to put my own money into the first bar. Every email is a vote for \"yes, this is interesting\". I'll write when I've decided, and what I changed based on your criticism.",
      points: [
        "I'll tell you whether I buy the bar or drop the idea",
        "I'll share what I changed after your feedback",
        "No spam, nothing for sale — one-click unsubscribe",
      ],
      privacy:
        "Your email is used only for project updates. I don't pass it to third parties.",
    },
    hero: {
      kicker: "Idea stage · Nothing for sale · Your opinion needed",
      description:
        "I'm planning to buy 1 kg of gold with my own money and build an open treasury of real assets around it — every purchase published with documents, and what to buy next decided together with the community. Before I spend the money, I want to know: does anyone besides me need this?",
      phrases: [
        "I'm planning to buy 1 kg of gold — before a single token exists.",
        "Asset and documents first, everything else later. Not the other way round.",
        "It's only an idea for now. Tell me where it breaks.",
      ],
      liveLabel: "Project status",
      liveBadge: "Idea",
      offlineTitle: "Now",
      offlineBody: "The idea is being discussed. Nothing has been bought or sold.",
      watchOnYoutube: "Discuss on X",
      streamChecking: "—",
      streamLatest: "—",
      videoPlaceholderLabel: "Status",
      videoPlaceholderTitle: "What exists now",
      videoPlaceholderBody: "An idea, a draft model and this site.",
      ctaTreasury: "What I'm planning",
      ctaManifesto: "Read the manifesto",
      statusItems: [
        { label: "Stage", value: "idea, collecting opinions" },
        { label: "Gold", value: "not bought yet" },
        { label: "Token", value: "does not exist" },
        { label: "Raised from people", value: "0" },
      ],
      discussCta: "Discuss on X",
    },
    teasers: {
      treasury: {
        title: "🗺️ The plan",
        body: "What I plan to buy first, how it will be documented, and what doesn't exist yet. Honest and point by point.",
        cta: "Open the plan",
      },
      token: {
        title: "🪙 Tokenomics (draft)",
        body: "What an allocation could look like if it ever comes to a token. A draft to criticise, not an offer.",
        cta: "Criticise the draft",
      },
      manifesto: {
        title: "🌍 Manifesto",
        body: "Why I came up with this, how it differs from PAXG and XAUT, and what bothers me about it myself.",
        cta: "Read the manifesto",
      },
    },
    philosophy: {
      kicker: "🌉 The idea",
      title: "Asset first — everything else later",
      description:
        "Why I think the order of things matters more than nice promises.",
      blocks: [
        {
          title: "⚠️ The problem I see",
          paragraphs: [
            "Most crypto projects are a name and a promise. Token first, then fundraising, then maybe buying something real. When new people stop arriving, nothing is left behind the project.",
            "I've lost my own money on exactly that. So I want to test whether it can be done the other way round.",
          ],
        },
        {
          title: "🥇 The idea: start with real gold",
          paragraphs: [
            "The plan is to buy 1 kg of gold with my own money before any token exists. The bar, its certificate and the purchase document get published so anyone can match the serial number.",
            "For now this is a plan. I haven't bought anything yet and want to hear criticism first.",
          ],
        },
        {
          title: "🏗️ A treasury that grows in the open",
          paragraphs: [
            "If the idea turns out to be wanted, the treasury adds more real assets — each with documents.",
            "What to buy next is discussed publicly with the people following the project — before the money is spent.",
          ],
        },
        {
          title: "🌐 Why now: the RWA trend",
          paragraphs: [
            "Tokenising real-world assets is a visible trend. But most projects keep their assets behind reports and custodians.",
            "I want to find out whether people want a different model: small, open, one person showing everything. Or whether nobody needs it — that's an answer too.",
          ],
        },
      ],
    },
    comparison: {
      kicker: "🔍 How it should differ",
      title: "The usual order, and the one I'm proposing",
      description: "The difference isn't in the promises — it's in what happens first.",
      others: {
        title: "⚠️ How it usually goes",
        items: [
          "Token and fundraising first, the asset maybe later",
          "Reserves are claimed but can't be checked independently",
          "Value rests on belief and on new people arriving",
          "Decisions about money are made behind closed doors",
        ],
      },
      us: {
        title: "✅ How I want to do it",
        items: [
          "🥇 Buy the gold with my own money first — before any token",
          "🧾 Publish the certificate, serial number and purchase document",
          "🗣️ Discuss the next purchase openly, before the money moves",
          "🔓 What exists and what doesn't — as a separate, honest list",
        ],
      },
    },
    treasuryGrowth: {
      kicker: "🔁 How it should work",
      title: "The loop I want to build",
      description:
        "This is a model, not a working system. None of the steps are live — I want it criticised before anything launches.",
      steps: [
        {
          title: "🥇 The first bar",
          body: "I buy 1 kg of gold with my own money and publish the documents. Not done yet — this is step one if the idea turns out to be wanted.",
        },
        {
          title: "💶 Project funds",
          body: "Later the project could accumulate funds, possibly including from a token. This is an open question.",
        },
        {
          title: "🗳️ The community discusses what's next",
          body: "Which asset to buy next is discussed in the open. There is no voting mechanism: it's an idea.",
        },
        {
          title: "🏦 A real asset is bought",
          body: "The next real asset is bought and properly registered.",
        },
        {
          title: "🧾 Documents are published",
          body: "Photo, serial number, certificate and purchase document — public, with personal data hidden.",
        },
        {
          title: "📈 The treasury grows in public",
          body: "Every step can be checked. No promises of profit.",
        },
      ],
      cycleNote:
        "🔄 This is a model for discussion. None of it exists yet and no money is being collected. If you see where it breaks — tell me, that's what this site is for.",
    },
    manifesto: {
      kicker: "🌍 Where I stand",
      statement:
        "I don't want to build a token of faith. I want to find out whether people want a treasury they can verify.",
      description:
        "I'm one person. I'm planning to put my own money into the first asset. But first I want to hear what you think.",
      tags: ["💡 Idea", "🗣️ Open to criticism", "👤 One person"],
      cta: "Read the full manifesto",
    },
    ownMoney: {
      kicker: "💰 Whose money",
      title: "The first bar — my money only",
      paragraphs: [
        "If I decide to launch, the first kilogram of gold will be bought with my own money, before anything exists that anyone could buy. No fundraising will come before it.",
        "That's exactly why I want to know in advance whether anyone needs this. Every opinion, every criticism and every email left here is part of that decision.",
      ],
      facts: [
        { label: "First asset", value: "1 kg of gold" },
        { label: "Whose money", value: "my own" },
        { label: "Raised from people", value: "0" },
        { label: "Status", value: "deciding" },
      ],
      note: "No price shown: gold moves up and down, and the exact amount will be on the purchase document if it gets that far.",
    },
    trust: {
      kicker: "🛡️ What the idea rests on",
      title: "Why gold, transparency, and honesty about weaknesses",
      description: "Three things without which the project makes no sense.",
      panels: [
        {
          title: "🥇 Why start with gold",
          body: "Gold is an easy-to-understand asset: its physical existence can be shown, documented and checked by serial number.",
        },
        {
          title: "🔍 Verification instead of promises",
          body: "Every purchase should be published in full: photo, serial number, certificate, purchase document. Not a summary of the purchase — the purchase.",
        },
        {
          title: "⚙️ Honesty about weaknesses",
          body: "The project has no team, no legal entity, no audit and no token. That's stated plainly — and will stay stated until it changes.",
        },
      ],
    },
    roadmap: {
      kicker: "🗺️ Roadmap",
      title: "Right now — the idea stage",
      statusLabels: { done: "Done", now: "Now", next: "Next" },
      steps: [
        {
          status: "done",
          title: "💡 Stage 00 — The idea",
          body: "The model is written down and this site is up.",
        },
        {
          status: "now",
          title: "🗣️ Stage 01 — Discussion",
          body: "Collecting opinions and criticism: is this needed, where does the model break, who would want to take part.",
        },
        {
          status: "next",
          title: "🥇 Stage 02 — The first asset",
          body: "If the interest is there — buying 1 kg of gold with my money and publishing the documents.",
        },
        {
          status: "next",
          title: "🪙 Stage 03 — Deciding on a token",
          body: "Only after the first asset, and only if the community thinks it's needed.",
        },
      ],
    },
    faq: {
      kicker: "❓ FAQ",
      title: "Questions I'm already getting",
      items: [
        {
          question: "🎯 Have you already bought the gold?",
          answer:
            "No. I'm planning to, and first I want to find out whether people need a project like this. If there's no interest, I won't launch it.",
        },
        {
          question: "🪙 Can I buy or invest in anything?",
          answer:
            "No. No token exists and no money is being collected. If someone offers you an 'early entry' into AUREUM LINK, it isn't me.",
        },
        {
          question: "🗳️ How can I help?",
          answer:
            "Speak up. Tell me what you like, what bothers you and what you'd change. Leave your email if you want the project to happen.",
        },
        {
          question: "💎 Why not just buy PAXG?",
          answer:
            "Good question, and I want your answer. PAXG is a claim on gold held by a custodian. I'm thinking about something else: an open treasury where every purchase is visible and the next one is chosen together. Whether that's needed is exactly what I'm testing.",
        },
        {
          question: "🧭 What if nobody needs this?",
          answer:
            "Then I won't buy a bar for the project, and I'll close it. That's an honest result too.",
        },
      ],
    },
    treasuryPage: {
      kicker: "🗺️ The plan",
      title: "What I plan to do, and what doesn't exist yet",
      description:
        "This will be the public list of the project's real assets. Right now it only holds the plan for the first purchase — nothing has been bought.",
      liveLabel: "Idea stage",
      status: {
        now: {
          title: "✅ What exists now",
          items: [
            "The idea and a draft model",
            "This site",
            "An open discussion on X and Telegram",
          ],
        },
        notYet: {
          title: "🚧 What doesn't exist yet",
          items: [
            "The gold isn't bought",
            "No token, contract or treasury wallet",
            "No legal entity, audit or team",
            "No money is being collected",
          ],
        },
        next: {
          title: "🎯 What's next",
          items: [
            "Collect opinions and criticism",
            "Decide whether to launch",
            "If yes — buy 1 kg of gold and publish the documents",
          ],
        },
      },
      assetsTitle: "First asset (planned)",
      fields: {
        serial: "Serial number",
        purchaseDate: "Purchase date",
        purchasePrice: "Purchase price",
        currentValue: "Current value",
        currentValueNote: "after purchase",
        vendor: "Seller",
        status: "Status",
      },
      statusValues: {
        owned: "In the treasury",
        pending: "Planned · not bought",
      },
      proofsTitle: "Documents",
      proofsIntro:
        "After the purchase, the certificate, the purchase document and a photo of the bar with its serial number will be published here.",
      zoom: "Open larger",
      close: "Close",
      redactedNote: "",
      protectedNote: "",
      photoPlaceholder: "The bar isn't bought yet",
      backHome: "Back to home",
    },
    tokenPage: {
      kicker: "🪙 Tokenomics — draft",
      liveBadge: "No token exists",
      title: "What an allocation could look like — a draft to criticise",
      description:
        "This is not an offer and not a sale. It's a draft I want to show before any decision: if something here looks suspicious, say so.",
      supplyLabel: "Total supply (draft)",
      supplyValue: "100,000,000 AUR",
      platformLabel: "Platform (draft)",
      platformValue: "Base · ERC-20",
      standardNote:
        "A decision about a token would only come after the first asset and an open discussion. There may never be one.",
      allocationTitle: "Allocation (draft)",
      allocation: [
        {
          label: "Project reserve",
          percent: 40,
          note: "Funds purchases of real assets. The wallet would be public.",
        },
        {
          label: "Public sale",
          percent: 30,
          note: "An open question: whether it's needed at all is under discussion.",
        },
        {
          label: "Liquidity",
          percent: 12,
          note: "Locked exchange liquidity.",
        },
        {
          label: "Founder",
          percent: 10,
          note: "4-year vest, 1-year cliff. Too much or too little? Tell me.",
        },
        {
          label: "Community",
          percent: 8,
          note: "For people who help the project.",
        },
      ],
      purposeTitle: "Why a token might be needed at all",
      purpose: [
        "A way to take part in the project and support it",
        "A unit around which the treasury's public history is built",
        "Maybe it isn't needed at all — that's an option too",
      ],
      purposeIsNotTitle: "What the token will NOT be",
      purposeIsNot: [
        "Not an investment product",
        "Not a share and not a right to any assets",
        "Not a promise of profit or income",
      ],
      contractLabel: "Contract address",
      contractPlaceholder: "does not exist",
      explorerNote:
        "There is no contract. If someone shows you an address for an \"AUREUM LINK token\", it isn't me.",
    },
    manifestoPage: {
      kicker: "🌍 Manifesto",
      title: "One person, one idea, an open discussion",
      lead: "I'm planning to buy 1 kg of gold with my own money and build an open treasury around it. Before I do, I want to hear what you think.",
      sections: [
        {
          title: "The problem",
          paragraphs: [
            "The crypto market is tired of promises. Tokens come and go, and behind most of them there's nothing you can check.",
            "I've lost money on a project like that myself — not an obvious scam, just an ordinary one with nothing underneath.",
          ],
        },
        {
          title: "What I want to do",
          paragraphs: [
            "An open treasury of real assets. Start with one kilogram of gold bought with my money, before any token exists. Publish every document.",
            "Discuss the next purchases openly — with the people following the project.",
          ],
        },
        {
          title: "What exists now",
          paragraphs: [
            "An idea, a draft model and this site. The gold isn't bought, there's no token, and I'm not taking money from anyone.",
            "Right now I'm collecting opinions: is this needed, who would want to take part, where does the model break.",
          ],
        },
        {
          title: "How this differs from PAXG and XAUT",
          paragraphs: [
            "PAXG and XAUT are tokens pegged 1:1 to gold held by centralised custodians. It's a regulated claim, and it works well.",
            "I'm thinking about something else: a small, open treasury where every purchase is visible and the next one is chosen together. No peg and no claim. Whether people want that is the main question.",
          ],
        },
      ],
      pullquote: "Don't take anyone's word for it. Including mine — criticise.",
      vsTitle: "Where I see the difference",
      them: {
        title: "⚠️ PAXG / XAUT and similar",
        items: [
          "Gold with a custodian — you trust the holder",
          "Transparency means periodic attestations",
          "Redemption via KYC and minimum amounts",
          "Reserve decisions made behind closed doors",
        ],
      },
      us: {
        title: "💡 The AUREUM LINK idea",
        items: [
          "Every purchase published in full",
          "The next asset discussed in the open",
          "Nothing to redeem: it isn't a claim",
          "One author, in the open, honest about what's missing",
        ],
      },
      planTitle: "Plan",
      plan: [
        { title: "Done", body: "The idea, the model and the site." },
        {
          title: "Now",
          body: "Collecting opinions and criticism on X and Telegram.",
        },
        {
          title: "Next",
          body: "If the interest is there — buying the first bar and publishing the documents.",
        },
      ],
      socialTitle: "Share the idea",
      socialLead:
        "If the idea interests you, share it. The more people weigh in, the more honest the decision will be.",
      socialHint: "Copy and post it",
      socialText:
        "Someone is planning to buy 1 kg of gold with his own money before any token exists, and build an open treasury where every purchase is visible. It's just an idea for now — and he's asking whether anyone needs it. aureum-link.com #AUREUMLINK #RWA",
      copy: "Copy text",
      copied: "Copied",
      backHome: "Back to home",
    },
    legalPage: {
      kicker: "⚖️ Disclaimer",
      title: "What AUREUM LINK is right now — and what it is not",
      intro: "Briefly and in plain words.",
      isNotTitle: "AUREUM LINK is NOT",
      isNot: [
        "an investment product, a security, or a financial instrument",
        "a fundraising, a pre-sale, or a way to deposit money",
        "a promise of profit, income, or price growth",
        "a claim on gold or any other asset",
        "a source of interest, dividends, or any payouts",
        "a live token — none exists",
      ],
      isTitle: "Right now it is",
      is: [
        "an idea under discussion",
        "a plan to buy 1 kg of gold with the author's own money",
        "a personal project by one person",
        "a place to criticise the model before it launches",
      ],
      noFundraisingTitle: "There is no fundraising",
      noFundraising:
        "The project collects no money and accepts no deposits. The gold isn't bought, no token exists, and nobody should be sending anything anywhere. If someone offers you an 'early entry' into AUREUM LINK, it isn't me.",
      notAdvice:
        "The materials on this site are informational and do not constitute investment, legal, or tax advice.",
      backHome: "Back to home",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];
