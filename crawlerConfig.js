new Crawler({
  appId: "LJBRFP5Y8O",
  indexPrefix: "",
  rateLimit: 8,
  maxDepth: 10,
  maxUrls: 1500, // 增加最大URL数量以确保抓取所有页面
  schedule: "every 1 day",
  startUrls: [
    "https://www.ric.moe",
    "https://www.ric.moe/docs/intro",
    "https://www.ric.moe/blog",
    "https://www.ric.moe/blog/archive",
    "https://www.ric.moe/blog/tags",
    "https://www.ric.moe/moments/",
    "https://www.ric.moe/links/",
    "https://www.ric.moe/about/",
    "https://www.ric.moe/feedback/",
    "https://www.ric.moe/search"
  ],
  renderJavaScript: false, // 禁用JavaScript渲染以符合计划限制
  sitemaps: ["https://www.ric.moe/sitemap.xml"],
  ignoreCanonicalTo: true,
  discoveryPatterns: ["https://www.ric.moe/**"],
  actions: [
    // 文档页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/docs/**"],
      recordExtractor: ({ $, helpers }) => {
        const lvl0 = $(".menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active")
          .last()
          .text() || "Documentation";
        
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: lvl0,
            },
            lvl1: ["header h1", "article h1", ".theme-doc-markdown h1"],
            lvl2: ["article h2", ".theme-doc-markdown h2"],
            lvl3: ["article h3", ".theme-doc-markdown h3"],
            lvl4: ["article h4", ".theme-doc-markdown h4"],
            lvl5: ["article h5", ".theme-doc-markdown h5", "article td:first-child"],
            lvl6: ["article h6", ".theme-doc-markdown h6"],
            content: [
              "article p", 
              "article li", 
              "article td:last-child",
              ".theme-doc-markdown p",
              ".theme-doc-markdown li",
              ".theme-doc-markdown .admonition-content p"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // 博客页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/blog/**"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "Blog",
            },
            lvl1: [
              "header h1", 
              "article h1",
              ".theme-blog-post-paginator__title",
              ".blog-post-item h2",
              "h1",
              "h2 a"
            ],
            lvl2: [
              "article h2", 
              ".theme-blog-post-paginator h2",
              "h2",
              "h3"
            ],
            lvl3: [
              "article h3", 
              ".theme-blog-post-paginator h3",
              "h3",
              "h4"
            ],
            lvl4: [
              "article h4", 
              ".theme-blog-post-paginator h4",
              "h4"
            ],
            lvl5: ["article h5", ".theme-blog-post-paginator h5", "h5"],
            lvl6: ["article h6", ".theme-blog-post-paginator h6", "h6"],
            content: [
              "article p",
              "article li",
              ".theme-blog-post-paginator p",
              ".theme-blog-post-paginator li",
              ".blog-post-item p",
              ".markdown p",
              ".markdown li",
              ".container p",
              ".container li",
              // 通用选择器作为后备
              "p",
              "li",
              "time",
              "small"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // Moments页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/moments/**"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "Moments",
            },
            lvl1: [
              "header .hero__title", 
              ".hero .hero__title",
              "h1",
              "main h1"
            ],
            lvl2: [
              "header .hero__subtitle",
              ".hero p",
              "main h2",
              "h2"
            ],
            lvl3: [
              ".card__header h3",
              "main h3", 
              "h3"
            ],
            lvl4: [".card__body h4", "main h4", "h4"],
            lvl5: [".card__body h5", "main h5", "h5"],
            lvl6: [".card__body h6", "main h6", "h6"],
            content: [
              ".hero p",
              ".card__body p",
              ".card__body li",
              ".card__footer small",
              "main p",
              "main li",
              ".container p",
              ".container li",
              // 通用选择器作为后备
              "p",
              "li",
              "button",
              "label",
              "small",
              "strong"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // Links页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/links/**"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "Links",
            },
            lvl1: [
              "header .hero__title", 
              ".hero .hero__title",
              "h1"
            ],
            lvl2: [
              "header .hero__subtitle",
              ".hero .hero__subtitle",
              "h2"
            ],
            lvl3: [
              ".avatar__name",
              ".card__header .avatar__name",
              "h3"
            ],
            lvl4: ["h4"],
            lvl5: ["h5"],
            lvl6: ["h6"],
            content: [
              ".hero .hero__subtitle",
              ".avatar__subtitle",
              ".card__header .avatar__subtitle",
              ".card__footer button a",
              ".button",
              // 通用选择器作为后备
              ".container p",
              ".container li",
              "p",
              "li",
              "small",
              "button",
              "a"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // About页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/about/**"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "About",
            },
            lvl1: ["header h1", ".hero__title", "main h1"],
            lvl2: ["main h2", ".card__header h2"],
            lvl3: ["main h3", ".card__header h3"],
            lvl4: ["main h4", ".card__header h4"],
            lvl5: ["main h5", ".card__header h5"],
            lvl6: ["main h6", ".card__header h6"],
            content: [
              "main p", 
              "main li",
              ".card__body p",
              ".card__body li",
              ".container p"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // Feedback页面配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/feedback/**"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "Feedback",
            },
            lvl1: ["header h1", ".hero__title", "main h1"],
            lvl2: ["main h2", ".card__header h2"],
            lvl3: ["main h3", ".card__header h3"],
            lvl4: ["main h4", ".card__header h4"],
            lvl5: ["main h5", ".card__header h5"],
            lvl6: ["main h6", ".card__header h6"],
            content: [
              "main p", 
              "main li",
              ".card__body p",
              ".card__body li",
              ".container p",
              "form label",
              "form .help-text"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
    // 首页配置
    {
      indexName: "ricmoedocusaurus",
      pathsToMatch: ["https://www.ric.moe/$"],
      recordExtractor: ({ $, helpers }) => {
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: "",
              defaultValue: "Home",
            },
            lvl1: [
              ".hero__title",
              "header h1",
              "main h1",
              "h1"
            ],
            lvl2: [
              ".hero__subtitle",
              ".card__header h2",
              "main h2",
              "h2"
            ],
            lvl3: [
              ".card__header h3",
              "main h3",
              "h3"
            ],
            lvl4: [
              ".card__body h4",
              "main h4",
              "h4"
            ],
            lvl5: ["main h5", "h5"],
            lvl6: ["main h6", "h6"],
            content: [
              ".hero__subtitle",
              ".card__body p",
              ".card__body li",
              ".card__footer p",
              "main p",
              "main li",
              ".container p",
              ".container li",
              // 通用选择器作为后备
              "p",
              "li",
              "button",
              "span"
            ],
          },
          aggregateContent: true,
          recordVersion: "v3",
        });
      },
    },
  ],
  safetyChecks: { 
    beforeIndexPublishing: { 
      maxLostRecordsPercentage: 20  // 降低阈值以适应更多页面类型
    } 
  },
  initialIndexSettings: {
    ricmoedocusaurus: {
      attributesForFaceting: [
        "type",
        "lang", 
        "language",
        "version",
        "docusaurus_tag"
      ],
      attributesToRetrieve: [
        "hierarchy",
        "content", 
        "anchor",
        "url",
        "url_without_anchor",
        "type"
      ],
      attributesToHighlight: [
        "hierarchy.lvl0",
        "hierarchy.lvl1", 
        "hierarchy.lvl2",
        "hierarchy.lvl3",
        "hierarchy.lvl4",
        "hierarchy.lvl5",
        "hierarchy.lvl6",
        "content"
      ],
      attributesToSnippet: ["content:15"], // 增加snippet长度
      camelCaseAttributes: ["hierarchy", "content"],
      searchableAttributes: [
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)", 
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy.lvl6)",
        "content"
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)", 
        "asc(weight.position)"
      ],
      ranking: [
        "words",
        "filters", 
        "typo",
        "attribute",
        "proximity",
        "exact", 
        "custom"
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true, 
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
  apiKey: "",
});