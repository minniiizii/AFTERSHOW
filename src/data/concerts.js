// AFTERSHOW — Concert Data
// Source: User-provided RTF files in /txtfile/
// Do NOT add, remove, or modify concert data without user confirmation.

const CONCERTS = [
  // ─── 고척스카이돔 ──────────────────────────────────────────────────────────
  {
    id: "wanna-one-therefore-2019",
    title: "2019 Wanna One Concert [Therefore]",
    artist: "Wanna One",
    tourName: "Therefore",
    venueId: "gocheok",
    venueName: "고척스카이돔",
    venueNameEn: "Gocheok Sky Dome",
    venueAddress: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    eventType: "단독 콘서트",
    dates: [
      { date: "2019-01-24", startTime: "19:30", day: "DAY 1" },
      { date: "2019-01-25", startTime: "19:30", day: "DAY 2" },
      { date: "2019-01-26", startTime: "17:00", day: "DAY 3" },
      { date: "2019-01-27", startTime: "17:00", day: "DAY 4" },
    ],
    poster: "public/posters/wanna one last con.jpg",
    sourceUrls: [
      "https://www.namu.moe/w/Therefore",
      "https://www.stagepick.co.kr/performances/detail/rA2bnAtXSzmhzWKE",
      "https://www.khan.co.kr/article/201901242356001"
    ],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "Wanna One 활동 종료 전 마지막 콘서트. 특별 무대는 날짜별로 상이함.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 0,  title: "Opening VCR",       section: "OPENING",             itemType: "VCR" },
      { order: 1,  title: "NEVER",             section: "OPENING",             itemType: "SONG" },
      { order: 2,  title: "에너제틱 (Energetic)", section: "OPENING",           itemType: "SONG" },
      { order: 3,  title: "나야 나 (Pick Me)",   section: "OPENING",           itemType: "SONG" },
      { order: 4,  title: "Talk",               section: "OPENING",             itemType: "MENT" },
      { order: 5,  title: "갖고 싶어 (I Wanna Have)", section: "OPENING",      itemType: "SONG" },
      { order: 6,  title: "Beautiful",          section: "OPENING",             itemType: "SONG" },
      { order: 7,  title: "VCR — RE: 멤버 Part.1", section: "OPENING",         itemType: "VCR" },
      // SECTION 02 — SPECIAL STAGE 1 (date-dependent)
      {
        order: 8, title: "Special Stage 1 (날짜별 상이)", section: "SPECIAL STAGE 1", itemType: "SPECIAL",
        notes: "2019-01-24 / 2019-01-26: 라이관린 — Stack / 박지훈 — Ghost+Superstar / 배진영 — 으르렁+Faded\n2019-01-25 / 2019-01-27: 하성운 — 너의 집 앞에서 / 윤지성 — 내가 니편이 되어줄게 / 강다니엘 — Rainism"
      },
      { order: 9,  title: "VCR — Wanna One History", section: "SPECIAL STAGE 1", itemType: "VCR" },
      // SECTION 03 — LIVE BAND PERFORMANCE
      { order: 10, title: "BOOMERANG (부메랑) — Live Band Ver.", section: "LIVE BAND PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 11, title: "Talk",             section: "LIVE BAND PERFORMANCE", itemType: "MENT" },
      { order: 12, title: "켜줘 (Light) — Live Band Ver.",    section: "LIVE BAND PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 13, title: "보여 (Day by Day) — Live Band Ver.", section: "LIVE BAND PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 14, title: "Talk",             section: "LIVE BAND PERFORMANCE", itemType: "MENT" },
      { order: 15, title: "약속해요 (I.P.U.) — Live Band Ver.", section: "LIVE BAND PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 16, title: "VCR — RE: 멤버 Part.2", section: "LIVE BAND PERFORMANCE", itemType: "VCR" },
      // SECTION 04 — SPECIAL STAGE 2 (date-dependent)
      {
        order: 17, title: "Special Stage 2 (날짜별 상이)", section: "SPECIAL STAGE 2", itemType: "SPECIAL",
        notes: "2019-01-24 / 2019-01-26: 이대휘 — Nothing Without You / 옹성우 — 제발 / 김재환 — 미안해+Sorry Not Sorry\n2019-01-25 / 2019-01-27: 황민현 — 기억을 걷는 시간 / 박우진 — 하루하루+거북선"
      },
      { order: 18, title: "VCR — 우진 슈퍼스타K", section: "SPECIAL STAGE 2", itemType: "VCR" },
      { order: 19, title: "Talk — Special Stage 이야기", section: "SPECIAL STAGE 2", itemType: "MENT" },
      // SECTION 05 — MAIN PERFORMANCE
      { order: 20, title: "활활 (Burn It Up) — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 21, title: "Wanna Be (My Baby) — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 22, title: "Twilight — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 23, title: "VCR — Special Number", section: "MAIN PERFORMANCE", itemType: "VCR", notes: "Narration: 윤지성, 이대휘" },
      { order: 24, title: "불꽃놀이 (Flowerbomb) — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 25, title: "Deeper — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 26, title: "묻고싶다 (One Love) — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      { order: 27, title: "Talk — 정규앨범 이야기", section: "MAIN PERFORMANCE", itemType: "MENT" },
      { order: 28, title: "봄바람 (Spring Breeze) — Live Band Ver.", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Live Band Ver." },
      // SECTION 06 — CLOSING
      { order: 29, title: "VCR — 워너원의 편지 / 멤버별 편지 영상", section: "CLOSING", itemType: "VCR", notes: "날짜별 상이" },
      { order: 30, title: "12번째 별 (12th Star) — Live Band Ver.", section: "CLOSING", itemType: "SONG", version: "Live Band Ver." },
      { order: 31, title: "Closing Ment",     section: "CLOSING", itemType: "MENT", notes: "BGM: 이 자리에 (Inst.)" },
      { order: 32, title: "Beautiful (Part. II)", section: "CLOSING", itemType: "SONG" },
      { order: 33, title: "VCR — Therefore, We Were One", section: "CLOSING", itemType: "VCR", notes: "BGM: To Be One (Outro.)" },
      { order: 34, title: "Ending Credit & Photo Slide Show", section: "CLOSING", itemType: "VCR", notes: "BGM: 술래, 집, Beautiful (Part. II)" },
    ]
  },

  {
    id: "golden-disc-33rd-2019",
    title: "제33회 골든디스크 어워즈",
    artist: "Various Artists",
    tourName: null,
    venueId: "gocheok",
    venueName: "고척스카이돔",
    venueNameEn: "Gocheok Sky Dome",
    venueAddress: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    eventType: "시상식 공연",
    dates: [
      { date: "2019-01-06", startTime: null, day: "2일 차 (음반 부문)" },
    ],
    poster: "public/posters/2019 골든디스크.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "실제 방송 진행 순서: 전체 순서 추가 확인 필요",
    setlist: [
      // 섹션 01 — NU'EST W
      { order: 1,  title: "Polaris",            section: "NU'EST W",            itemType: "SONG", artistOrPerformer: "NU'EST W" },
      { order: 2,  title: "Dejavu",             section: "NU'EST W",            itemType: "SONG", artistOrPerformer: "NU'EST W" },
      { order: 3,  title: "Help Me",            section: "NU'EST W",            itemType: "SONG", artistOrPerformer: "NU'EST W" },
      // 섹션 02 — IZ*ONE
      { order: 4,  title: "O'My!",              section: "IZ*ONE",              itemType: "SONG", artistOrPerformer: "IZ*ONE" },
      { order: 5,  title: "La Vie en Rose",     section: "IZ*ONE",              itemType: "SONG", artistOrPerformer: "IZ*ONE" },
      // 섹션 03 — Stray Kids
      { order: 6,  title: "I am NOT",           section: "Stray Kids",          itemType: "SONG", artistOrPerformer: "Stray Kids" },
      { order: 7,  title: "WHO",                section: "Stray Kids",          itemType: "SONG", artistOrPerformer: "Stray Kids" },
      { order: 8,  title: "YOU",                section: "Stray Kids",          itemType: "SONG", artistOrPerformer: "Stray Kids" },
      // 섹션 04 — Wanna One
      { order: 9,  title: "Boomerang",          section: "Wanna One",           itemType: "SONG", artistOrPerformer: "Wanna One" },
      { order: 10, title: "Always",             section: "Wanna One",           itemType: "SONG", artistOrPerformer: "Wanna One" },
      // 섹션 05 — TWICE
      { order: 11, title: "BDZ (Korean Version)", section: "TWICE",             itemType: "SONG", artistOrPerformer: "TWICE" },
      { order: 12, title: "What Is Love?",      section: "TWICE",               itemType: "SONG", artistOrPerformer: "TWICE" },
      // 섹션 06 — 특별 커버 무대
      { order: 13, title: "Mirotic (TVXQ 커버)", section: "특별 커버 무대",      itemType: "SONG", artistOrPerformer: "IZ*ONE" },
      { order: 14, title: "Road (g.o.d 커버)",   section: "특별 커버 무대",      itemType: "SONG", artistOrPerformer: "Stray Kids" },
      { order: 15, title: "Happiness (H.O.T. 커버)", section: "특별 커버 무대", itemType: "SONG", artistOrPerformer: "IZ*ONE" },
      { order: 16, title: "BANG BANG BANG (BIGBANG 커버)", section: "특별 커버 무대", itemType: "SONG", artistOrPerformer: "Stray Kids" },
      // 섹션 07 — SEVENTEEN
      { order: 17, title: "Oh My!",             section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 18, title: "CLAP",               section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 19, title: "Getting Closer",     section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      // 섹션 08 — Paul Kim
      { order: 20, title: "Every Day, Every Moment", section: "Paul Kim",       itemType: "SONG", artistOrPerformer: "Paul Kim" },
      // 섹션 09 — 특별 유닛 무대
      { order: 21, title: "No Reason",          section: "특별 유닛 무대",       itemType: "SONG", artistOrPerformer: "MONSTA X Kihyun, Wonho, Minhyuk" },
      { order: 22, title: "Thanksful for You",  section: "특별 유닛 무대",       itemType: "SONG", artistOrPerformer: "NU'EST W Baekho" },
      // 섹션 10 — 특별 퍼포먼스
      { order: 23, title: "Dance Performance",  section: "특별 퍼포먼스",        itemType: "SPECIAL", artistOrPerformer: "Wanna One Park Woo Jin, Ha Sung Woon" },
      { order: 24, title: "A-TEEN",             section: "특별 퍼포먼스",        itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      // 섹션 11 — GOT7
      { order: 25, title: "Miracle",            section: "GOT7",                itemType: "SONG", artistOrPerformer: "GOT7" },
      { order: 26, title: "From Now",           section: "GOT7",                itemType: "SONG", artistOrPerformer: "GOT7" },
      { order: 27, title: "Look",               section: "GOT7",                itemType: "SONG", artistOrPerformer: "GOT7" },
      // 섹션 12 — BTS
      { order: 28, title: "Fake Love",          section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 29, title: "IDOL",               section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      // 섹션 13 — MONSTA X
      { order: 30, title: "Myself",             section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 31, title: "Crazy in Love",      section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 32, title: "Jealousy",           section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 33, title: "Shoot Out",          section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
    ]
  },

  {
    id: "golden-disc-34th-2020",
    title: "제34회 골든디스크어워즈",
    artist: "Various Artists",
    tourName: null,
    venueId: "gocheok",
    venueName: "고척스카이돔",
    venueNameEn: "Gocheok Sky Dome",
    venueAddress: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    eventType: "시상식 공연",
    dates: [
      { date: "2020-01-05", startTime: null, day: "2일 차 (음반 부문)" },
    ],
    poster: "public/posters/2020 골든디스크.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "진행자: 이승기, 박소담. 실제 전체 진행 순서: 전체 방송과 대조 필요",
    setlist: [
      { order: 1,  title: "LION",               section: "(G)I-DLE",            itemType: "SONG", artistOrPerformer: "(G)I-DLE" },
      { order: 2,  title: "Again",              section: "ASTRO",               itemType: "SONG", artistOrPerformer: "ASTRO" },
      { order: 3,  title: "Blue Flame",         section: "ASTRO",               itemType: "SONG", artistOrPerformer: "ASTRO" },
      { order: 4,  title: "Stronger",           section: "NCT DREAM",           itemType: "SONG", artistOrPerformer: "NCT DREAM" },
      { order: 5,  title: "BOOM",               section: "NCT DREAM",           itemType: "SONG", artistOrPerformer: "NCT DREAM" },
      { order: 6,  title: "Melting",            section: "TWICE",               itemType: "SONG", artistOrPerformer: "TWICE" },
      { order: 7,  title: "Feel Special",       section: "TWICE",               itemType: "SONG", artistOrPerformer: "TWICE" },
      { order: 8,  title: "Home",               section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 9,  title: "Good to Me",         section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 10, title: "Getting Closer",     section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 11, title: "Fear",               section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 12, title: "Happy Ending",       section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 13, title: "Hug",                section: "SEVENTEEN",           itemType: "SONG", artistOrPerformer: "SEVENTEEN" },
      { order: 14, title: "Find You",           section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 15, title: "Play It Cool",       section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 16, title: "Alligator",          section: "MONSTA X",            itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 17, title: "Myself (Bazzi 커버)", section: "MONSTA X",           itemType: "SONG", artistOrPerformer: "MONSTA X" },
      { order: 18, title: "Remember Me",        section: "Gummy",               itemType: "SONG", artistOrPerformer: "Gummy" },
      { order: 19, title: "Eclipse",            section: "GOT7",                itemType: "SONG", artistOrPerformer: "GOT7" },
      { order: 20, title: "You Calling My Name", section: "GOT7",              itemType: "SONG", artistOrPerformer: "GOT7" },
      { order: 21, title: "BASS",               section: "NU'EST",              itemType: "SONG", artistOrPerformer: "NU'EST" },
      { order: 22, title: "Bet Bet",            section: "NU'EST",              itemType: "SONG", artistOrPerformer: "NU'EST" },
      { order: 23, title: "Boy With Luv",       section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 24, title: "Skool Luv Affair",   section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 25, title: "Dimple",             section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 26, title: "Mikrokosmos",        section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 27, title: "Dionysus",           section: "BTS",                 itemType: "SONG", artistOrPerformer: "BTS" },
      { order: 28, title: "Boy With Luv (앙코르)", section: "BTS",              itemType: "SONG", artistOrPerformer: "BTS" },
    ]
  },

  {
    id: "nct-dream-show4-2025",
    title: "2025 NCT DREAM TOUR <THE DREAM SHOW 4 : DREAM THE FUTURE>",
    artist: "NCT DREAM",
    tourName: "THE DREAM SHOW 4 : DREAM THE FUTURE",
    venueId: "gocheok",
    venueName: "고척스카이돔",
    venueNameEn: "Gocheok Sky Dome",
    venueAddress: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    eventType: "월드 투어 / 단독 콘서트",
    ageRating: "7세 이상",
    ticketPrice: { vip: "198,000원", general: "154,000원" },
    dates: [
      { date: "2025-07-11", startTime: "19:00", day: "서울 DAY 2" },
    ],
    poster: "public/posters/NCT DREAM THE DREAM SHOW 4.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "커버곡: Dunk Shot — Lee Seung Hwan, CANDY — H.O.T. STRONGER: JENO & JAEMIN 댄스 브레이크 포함.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 1,  title: "BTTF",               section: "OPENING",             itemType: "SONG" },
      { order: 2,  title: "Déjà Vu",            section: "OPENING",             itemType: "SONG" },
      { order: 3,  title: "Ridin'",             section: "OPENING",             itemType: "SONG" },
      { order: 4,  title: "ISTJ",               section: "OPENING",             itemType: "SONG" },
      { order: 5,  title: "BOOM",               section: "OPENING",             itemType: "SONG" },
      // SECTION 02 — FIRST FAN INTERACTION
      { order: 6,  title: "MENT",               section: "FIRST FAN INTERACTION", itemType: "MENT" },
      { order: 7,  title: "We Young",           section: "FIRST FAN INTERACTION", itemType: "SONG" },
      { order: 8,  title: "Dunk Shot (Lee Seung Hwan 커버)", section: "FIRST FAN INTERACTION", itemType: "SONG", notes: "Lee Seung Hwan 커버" },
      { order: 9,  title: "CANDY (H.O.T. 커버)", section: "FIRST FAN INTERACTION", itemType: "SONG", notes: "H.O.T. 커버" },
      // SECTION 03 — VCR / MAIN PERFORMANCE
      { order: 10, title: "VCR",                section: "VCR / MAIN PERFORMANCE", itemType: "VCR" },
      { order: 11, title: "Hot Sauce (Extended)", section: "VCR / MAIN PERFORMANCE", itemType: "SONG", version: "Extended" },
      { order: 12, title: "Diggity",            section: "VCR / MAIN PERFORMANCE", itemType: "SONG" },
      // SECTION 04 — TALK
      { order: 13, title: "MENT",               section: "TALK",                itemType: "MENT" },
      { order: 14, title: "1, 2, 3",            section: "TALK",                itemType: "SONG" },
      { order: 15, title: "On the Way",         section: "TALK",                itemType: "SONG" },
      { order: 16, title: "YOU",                section: "TALK",                itemType: "SONG" },
      { order: 17, title: "La La Love",         section: "TALK",                itemType: "SONG" },
      { order: 18, title: "My Page",            section: "TALK",                itemType: "SONG" },
      // SECTION 05 — VCR / PERFORMANCE
      { order: 19, title: "VCR",                section: "VCR / PERFORMANCE",   itemType: "VCR" },
      { order: 20, title: "Best of Me",         section: "VCR / PERFORMANCE",   itemType: "SONG" },
      { order: 21, title: "STRONGER (Extended)", section: "VCR / PERFORMANCE",  itemType: "SONG", version: "Extended" },
      { order: 22, title: "JENO & JAEMIN Dance Break", section: "VCR / PERFORMANCE", itemType: "SPECIAL" },
      { order: 23, title: "Smoothie",           section: "VCR / PERFORMANCE",   itemType: "SONG" },
      // SECTION 06 — FINAL PERFORMANCE
      { order: 24, title: "MENT",               section: "FINAL PERFORMANCE",   itemType: "MENT" },
      { order: 25, title: "Moonlight (Korean Ver.)", section: "FINAL PERFORMANCE", itemType: "SONG", version: "Korean Ver." },
      { order: 26, title: "Broken Melodies",    section: "FINAL PERFORMANCE",   itemType: "SONG" },
      { order: 27, title: "Trigger the Fever",  section: "FINAL PERFORMANCE",   itemType: "SONG" },
      { order: 28, title: "Hello Future (Rearranged)", section: "FINAL PERFORMANCE", itemType: "SONG", version: "Rearranged" },
      // SECTION 07 — ENCORE
      { order: 29, title: "VCR",               section: "ENCORE",               itemType: "VCR" },
      { order: 30, title: "Never Goodbye",     section: "ENCORE",               itemType: "SONG" },
      { order: 31, title: "CHILLER",           section: "ENCORE",               itemType: "SONG" },
      { order: 32, title: "Off the Wall",      section: "ENCORE",               itemType: "SONG" },
      { order: 33, title: "Rocket",            section: "ENCORE",               itemType: "SONG" },
      // SECTION 08 — FINAL TALK
      { order: 34, title: "MENT",             section: "FINAL TALK",            itemType: "MENT" },
      { order: 35, title: "Heavenly",         section: "FINAL TALK",            itemType: "SONG" },
    ]
  },

  {
    id: "mma-17th-2025",
    title: "THE 17th MELON MUSIC AWARDS",
    artist: "Various Artists",
    tourName: null,
    venueId: "gocheok",
    venueName: "고척스카이돔",
    venueNameEn: "Gocheok Sky Dome",
    venueAddress: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    eventType: "시상식 공연",
    ageRating: "7세 이상",
    ticketPrice: { general: "55,000원 (지정석)" },
    dates: [
      { date: "2025-12-20", startTime: "17:00", day: "단일" },
    ],
    poster: "public/posters/THE 17th MELON MUSIC AWARDS.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "공식 행사명: MMA2025. 슬로건: Play The Moment. 주최: 카카오엔터테인먼트. VCR·시상·무대 전환 시각: 별도 확인 필요.",
    setlist: [
      // 1부
      { order: 1,  title: "ALPHA DRIVE ONE",   section: "1부",  itemType: "SONG" },
      { order: 2,  title: "HOLA SOLAR (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 3,  title: "FORMULA",           section: "1부",  itemType: "SONG" },
      { order: 4,  title: "KiiiKiii",          section: "1부",  itemType: "SONG" },
      { order: 5,  title: "To Me From Me (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 6,  title: "I DO ME (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 7,  title: "DANCING ALONE (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 8,  title: "한로로 (HANRORO)",   section: "1부",  itemType: "SONG", artistOrPerformer: "한로로" },
      { order: 9,  title: "0+0",               section: "1부",  itemType: "SONG" },
      { order: 10, title: "사랑하게 될 거야 (Landing in Love)", section: "1부", itemType: "SONG" },
      { order: 11, title: "WOODZ",             section: "1부",  itemType: "SONG", artistOrPerformer: "WOODZ" },
      { order: 12, title: "Drowning",          section: "1부",  itemType: "SONG", artistOrPerformer: "WOODZ" },
      { order: 13, title: "00:30",             section: "1부",  itemType: "SONG", artistOrPerformer: "WOODZ" },
      { order: 14, title: "10CM",              section: "1부",  itemType: "SONG", artistOrPerformer: "10CM" },
      { order: 15, title: "사랑은 여섯줄 (Acoustic Ver.)", section: "1부", itemType: "SONG", artistOrPerformer: "10CM", version: "Acoustic Ver." },
      { order: 16, title: "너에게 닿기를 (with. 주우재)", section: "1부", itemType: "SONG", artistOrPerformer: "10CM" },
      { order: 17, title: "IDID",              section: "1부",  itemType: "SONG" },
      { order: 18, title: "제멋대로 찬란하게 (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 19, title: "PUSH BACK (MMA Ver.)", section: "1부", itemType: "SONG", version: "MMA Ver." },
      { order: 20, title: "DNA Remix",         section: "1부 — TEAM JAY PARK", itemType: "SONG", artistOrPerformer: "박재범, H1GHR MUSIC, LNGSHOT, 다영" },
      { order: 21, title: "BLUE CHECK",        section: "1부 — TEAM JAY PARK", itemType: "SONG", artistOrPerformer: "박재범" },
      { order: 22, title: "Dance Break",       section: "1부 — TEAM JAY PARK", itemType: "SPECIAL" },
      { order: 23, title: "The Purge",         section: "1부 — TEAM JAY PARK", itemType: "SONG" },
      { order: 24, title: "Backseat",          section: "1부 — TEAM JAY PARK", itemType: "SONG" },
      { order: 25, title: "Saucin'",           section: "1부 — TEAM JAY PARK", itemType: "SONG" },
      { order: 26, title: "몸매 (MOMMAE)",     section: "1부 — TEAM JAY PARK", itemType: "SONG" },
      { order: 27, title: "Keep It Sexy (MOMMAE 2) (with. 다영)", section: "1부 — TEAM JAY PARK", itemType: "SONG" },
      // 2부
      { order: 28, title: "ALLDAY PROJECT",    section: "2부",  itemType: "SONG", artistOrPerformer: "ALLDAY PROJECT" },
      { order: 29, title: "ONE MORE TIME",     section: "2부",  itemType: "SONG", artistOrPerformer: "ALLDAY PROJECT" },
      { order: 30, title: "LOOK AT ME",        section: "2부",  itemType: "SONG", artistOrPerformer: "ALLDAY PROJECT" },
      { order: 31, title: "FAMOUS",            section: "2부",  itemType: "SONG" },
      { order: 32, title: "Hearts2Hearts",     section: "2부",  itemType: "SONG" },
      { order: 33, title: "The Chase (MMA Ver.)", section: "2부", itemType: "SONG", version: "MMA Ver." },
      { order: 34, title: "FOCUS (MMA Ver.)",  section: "2부",  itemType: "SONG", version: "MMA Ver." },
      { order: 35, title: "ILLIT",             section: "2부",  itemType: "SONG", artistOrPerformer: "ILLIT" },
      { order: 36, title: "빌려온 고양이 (Do the Dance)", section: "2부", itemType: "SONG", artistOrPerformer: "ILLIT" },
      { order: 37, title: "NOT CUTE ANYMORE",  section: "2부",  itemType: "SONG", artistOrPerformer: "ILLIT" },
      { order: 38, title: "NCT WISH",          section: "2부",  itemType: "SONG", artistOrPerformer: "NCT WISH" },
      { order: 39, title: "poppop",            section: "2부",  itemType: "SONG", artistOrPerformer: "NCT WISH" },
      { order: 40, title: "Videohood",         section: "2부",  itemType: "SONG", artistOrPerformer: "NCT WISH" },
      { order: 41, title: "COLOR",             section: "2부",  itemType: "SONG", artistOrPerformer: "NCT WISH" },
      { order: 42, title: "RIIZE",             section: "2부",  itemType: "SONG", artistOrPerformer: "RIIZE" },
      { order: 43, title: "Fame",              section: "2부",  itemType: "SONG", artistOrPerformer: "RIIZE" },
      { order: 44, title: "Bag Bad Back",      section: "2부",  itemType: "SONG", artistOrPerformer: "RIIZE" },
      { order: 45, title: "Fly Up",            section: "2부",  itemType: "SONG", artistOrPerformer: "RIIZE" },
      { order: 46, title: "BOYNEXTDOOR",       section: "2부",  itemType: "SONG", artistOrPerformer: "BOYNEXTDOOR" },
      { order: 47, title: "Hollywood Action (MMA Ver.)", section: "2부", itemType: "SONG", artistOrPerformer: "BOYNEXTDOOR", version: "MMA Ver." },
      { order: 48, title: "오늘만 I LOVE YOU", section: "2부",  itemType: "SONG", artistOrPerformer: "BOYNEXTDOOR" },
      // 3부
      { order: 49, title: "Tough Cookie",      section: "3부 — 지코 (ZICO)",   itemType: "SONG", artistOrPerformer: "지코 (ZICO)" },
      { order: 50, title: "No you can't",      section: "3부 — 지코 (ZICO)",   itemType: "SONG", artistOrPerformer: "지코 (ZICO)" },
      { order: 51, title: "DUET (with. Lilas)", section: "3부 — 지코 (ZICO)",  itemType: "SONG", artistOrPerformer: "지코 (ZICO)" },
      { order: 52, title: "XOXZ",              section: "3부 — IVE",           itemType: "SONG", artistOrPerformer: "IVE" },
      { order: 53, title: "ATTITUDE",          section: "3부 — IVE",           itemType: "SONG", artistOrPerformer: "IVE" },
      { order: 54, title: "REBEL HEART",       section: "3부 — IVE",           itemType: "SONG", artistOrPerformer: "IVE" },
      { order: 55, title: "Dash",              section: "3부 — PLAVE",         itemType: "SONG", artistOrPerformer: "PLAVE" },
      { order: 56, title: "BBUU!",             section: "3부 — PLAVE",         itemType: "SONG", artistOrPerformer: "PLAVE" },
      { order: 57, title: "늑대와 미녀 (Wolf)", section: "3부 — EXO",          itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 58, title: "Monster",           section: "3부 — EXO",           itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 59, title: "전야 (前夜) (The Eve)", section: "3부 — EXO",       itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 60, title: "LOVE SHOT",         section: "3부 — EXO",           itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 61, title: "으르렁 (Growl)",    section: "3부 — EXO",           itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 62, title: "Back It Up",        section: "3부 — EXO",           itemType: "SONG", artistOrPerformer: "EXO" },
      { order: 63, title: "Drift",             section: "3부 — aespa",         itemType: "SONG", artistOrPerformer: "aespa" },
      { order: 64, title: "Rich Man",          section: "3부 — aespa",         itemType: "SONG", artistOrPerformer: "aespa" },
      { order: 65, title: "Dirty Work",        section: "3부 — aespa",         itemType: "SONG", artistOrPerformer: "aespa" },
      { order: 66, title: "Seoul City",        section: "3부 — 제니 (JENNIE)",  itemType: "SONG", artistOrPerformer: "제니 (JENNIE)" },
      { order: 67, title: "ZEN",               section: "3부 — 제니 (JENNIE)",  itemType: "SONG", artistOrPerformer: "제니 (JENNIE)" },
      { order: 68, title: "like JENNIE",       section: "3부 — 제니 (JENNIE)",  itemType: "SONG", artistOrPerformer: "제니 (JENNIE)" },
      { order: 69, title: "DRAMA (feat. 송소희)", section: "3부 — G-DRAGON",   itemType: "SONG", artistOrPerformer: "G-DRAGON" },
      { order: 70, title: "PO₩ER",             section: "3부 — G-DRAGON",      itemType: "SONG", artistOrPerformer: "G-DRAGON" },
      { order: 71, title: "HOME SWEET HOME (feat. 태양, 대성)", section: "3부 — G-DRAGON", itemType: "SONG", artistOrPerformer: "G-DRAGON" },
      { order: 72, title: "Bridge Performance — RHTokyo", section: "3부 — G-DRAGON", itemType: "SPECIAL" },
      { order: 73, title: "TOO BAD (Alan Walker Remix)", section: "3부 — G-DRAGON", itemType: "SONG", version: "Alan Walker Remix" },
      { order: 74, title: "삐딱하게 (Crooked)", section: "3부 — G-DRAGON",     itemType: "SONG", artistOrPerformer: "G-DRAGON" },
    ]
  },

  // ─── KSPO DOME ────────────────────────────────────────────────────────────
  {
    id: "riize-fancon-riizingday-2024",
    title: "2024 RIIZE FAN-CON 'RIIZING DAY' FINALE in SEOUL",
    artist: "RIIZE",
    tourName: "RIIZING DAY",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    eventType: "팬콘서트",
    ticketPrice: { vip: "154,000원", general: "121,000원" },
    dates: [
      { date: "2024-09-13", day: "DAY 1" },
      { date: "2024-09-14", day: "DAY 2" },
      { date: "2024-09-15", day: "DAY 3" },
    ],
    poster: "public/posters/RIIZE FAN-CON ‘RIIZING DAY’ FINALE in SEOUL.jpg",
    sourceUrls: [
      "https://youtu.be/kIL0v7Spw3k?si=bRjAFow0abuA1SKB",
      "https://youtu.be/EKGshRKwfek?si=aROUGhal7kTZp3VL",
      "https://youtu.be/xXRU1lqH6vY?si=goA1E3JxJWttavTE"
    ],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "공연 시간: 약 120분. 회차별 세부 차이 및 정확한 무대 전환 시점: 영상 대조 필요.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 0, title: "VCR",             section: "OPENING",             itemType: "VCR" },
      { order: 1, title: "Siren",           section: "OPENING",             itemType: "SONG" },
      // SECTION 02 — TALK
      { order: 2, title: "MENT (토크)",     section: "TALK",                itemType: "MENT" },
      // SECTION 03 — MAIN PERFORMANCE
      { order: 3, title: "Love 119",        section: "MAIN PERFORMANCE",    itemType: "SONG" },
      { order: 4, title: "Get A Guitar",    section: "MAIN PERFORMANCE",    itemType: "SONG" },
      // SECTION 04 — VCR
      { order: 5, title: "VCR",            section: "VCR",                  itemType: "VCR" },
      // SECTION 05 — PERFORMANCE
      { order: 6, title: "Honestly (Performance ver.)", section: "PERFORMANCE", itemType: "SONG", version: "Performance ver." },
      // SECTION 06 — FAN EVENT
      { order: 7, title: "MENT",           section: "FAN EVENT",            itemType: "MENT" },
      { order: 8, title: "리얼타임 성장보고서", section: "FAN EVENT",       itemType: "SPECIAL" },
      { order: 9, title: "라이징데이 엔게임", section: "FAN EVENT",         itemType: "SPECIAL" },
      // SECTION 07 — FAN-CON PERFORMANCE
      { order: 10, title: "Be My Next",    section: "FAN-CON PERFORMANCE",  itemType: "SONG" },
      { order: 11, title: "Lucky",         section: "FAN-CON PERFORMANCE",  itemType: "SONG" },
      { order: 12, title: "Memories",      section: "FAN-CON PERFORMANCE",  itemType: "SONG" },
      // SECTION 08 — VCR
      { order: 13, title: "VCR",          section: "VCR",                   itemType: "VCR" },
      // SECTION 09 — SPECIAL STAGE
      { order: 14, title: "Combo",         section: "SPECIAL STAGE",        itemType: "SONG" },
      { order: 15, title: "Rising Sun (TVXQ! 커버)", section: "SPECIAL STAGE", itemType: "SONG", notes: "TVXQ! 커버" },
      // SECTION 10 — TALK
      { order: 16, title: "MENT",         section: "TALK",                  itemType: "MENT" },
      // SECTION 11 — PERFORMANCE
      { order: 17, title: "Talk Saxy",    section: "PERFORMANCE",           itemType: "SONG" },
      { order: 18, title: "9 Days",       section: "PERFORMANCE",           itemType: "SONG" },
      { order: 19, title: "Impossible",   section: "PERFORMANCE",           itemType: "SONG" },
      // SECTION 12 — TALK
      { order: 20, title: "MENT",         section: "TALK",                  itemType: "MENT" },
      // SECTION 13 — FINAL PERFORMANCE
      { order: 21, title: "Boom Boom Bass", section: "FINAL PERFORMANCE",  itemType: "SONG" },
      // SECTION 14 — ENCORE VCR
      { order: 22, title: "ENCORE VCR",   section: "ENCORE VCR",           itemType: "VCR" },
      // SECTION 15 — ENCORE
      { order: 23, title: "Same Key",     section: "ENCORE",               itemType: "SONG" },
      { order: 24, title: "HAPPY! HAPPY! HAPPY! (Korean Ver.)", section: "ENCORE", itemType: "SONG", version: "Korean Ver." },
      // SECTION 16 — FINAL TALK
      { order: 25, title: "MENT",         section: "FINAL TALK",           itemType: "MENT" },
      // SECTION 17 — LAST SONG
      { order: 26, title: "One Kiss",     section: "LAST SONG",            itemType: "SONG" },
    ]
  },

  {
    id: "aespa-synk-parallel-line-2025",
    title: "2024-25 aespa LIVE TOUR – SYNK : PARALLEL LINE – ENCORE",
    artist: "aespa",
    tourName: "SYNK : PARALLEL LINE",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    eventType: "단독 콘서트 / 앙코르",
    organizer: "SM ENTERTAINMENT",
    ticketPrice: { vip: "198,000원", general: "154,000원" },
    dates: [
      { date: "2025-03-15", startTime: "18:00", day: "DAY 1" },
      { date: "2025-03-16", startTime: "17:00", day: "DAY 2" },
    ],
    poster: "public/posters/aespa LIVE TOUR SYNK PARALLEL LINE.jpg",
    sourceUrls: [
      "https://www.setlist.fm/setlist/aespa/2025/kspo-dome-seoul-south-korea-135da181.html"
    ],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "아래 세트리스트는 DAY 2 (2025-03-16) 기준. 관람 시간: 약 150분.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 1,  title: "Intro VCR",          section: "OPENING",             itemType: "VCR" },
      { order: 2,  title: "Drama",              section: "OPENING",             itemType: "SONG" },
      { order: 3,  title: "Black Mamba",        section: "OPENING",             itemType: "SONG" },
      { order: 4,  title: "Salty & Sweet",      section: "OPENING",             itemType: "SONG" },
      { order: 5,  title: "ænergy (Band Ver., Shortened)", section: "OPENING", itemType: "SONG", version: "Band Ver., Shortened" },
      // SECTION 02 — CHAPTER 1: WHO'S THAT GIRLS?
      { order: 6,  title: "Chapter 1: Who's That Girls? (VCR)", section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "VCR" },
      { order: 7,  title: "Mine",               section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      { order: 8,  title: "Die Trying",         section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      { order: 9,  title: "MENT 1",             section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "MENT" },
      { order: 10, title: "Flowers",            section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      { order: 11, title: "Lucid Dream",        section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      { order: 12, title: "Flights, Not Feelings", section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      { order: 13, title: "Better Things",      section: "CHAPTER 1: WHO'S THAT GIRLS?", itemType: "SONG" },
      // SECTION 03 — MEMBER SOLO STAGES
      { order: 14, title: "Breaking News (VCR)", section: "MEMBER SOLO STAGES", itemType: "VCR" },
      { order: 15, title: "Dopamine — GISELLE Solo", section: "MEMBER SOLO STAGES", itemType: "SONG", artistOrPerformer: "GISELLE" },
      { order: 16, title: "UP — KARINA Solo",   section: "MEMBER SOLO STAGES", itemType: "SONG", artistOrPerformer: "KARINA" },
      { order: 17, title: "Bored! — NINGNING Solo", section: "MEMBER SOLO STAGES", itemType: "SONG", artistOrPerformer: "NINGNING" },
      { order: 18, title: "Spark — WINTER Solo", section: "MEMBER SOLO STAGES", itemType: "SONG", artistOrPerformer: "WINTER" },
      // SECTION 04 — MAIN PERFORMANCE
      { order: 19, title: "VCR",               section: "MAIN PERFORMANCE",    itemType: "VCR" },
      { order: 20, title: "Supernova",          section: "MAIN PERFORMANCE",    itemType: "SONG" },
      { order: 21, title: "Pink Hoodie",        section: "MAIN PERFORMANCE",    itemType: "SONG" },
      { order: 22, title: "MENT 2",             section: "MAIN PERFORMANCE",    itemType: "MENT" },
      { order: 23, title: "Hold on Tight (Remix)", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Remix" },
      { order: 24, title: "Live My Life",       section: "MAIN PERFORMANCE",    itemType: "SONG" },
      { order: 25, title: "YEPPI YEPPI",        section: "MAIN PERFORMANCE",    itemType: "SONG" },
      { order: 26, title: "We Go",              section: "MAIN PERFORMANCE",    itemType: "SONG" },
      // SECTION 05 — NÆVIS / WHIPLASH ERA
      { order: 27, title: "VCR",               section: "NÆVIS / WHIPLASH ERA", itemType: "VCR" },
      { order: 28, title: "Game — nævis Solo",  section: "NÆVIS / WHIPLASH ERA", itemType: "SONG", artistOrPerformer: "nævis" },
      { order: 29, title: "Whiplash (MAMA Ver.)", section: "NÆVIS / WHIPLASH ERA", itemType: "SONG", version: "MAMA Ver." },
      { order: 30, title: "Set the Tone (Band Ver.)", section: "NÆVIS / WHIPLASH ERA", itemType: "SONG", version: "Band Ver." },
      { order: 31, title: "Next Level (Rock Ver.)", section: "NÆVIS / WHIPLASH ERA", itemType: "SONG", version: "Rock Ver." },
      { order: 32, title: "Armageddon (Rock Ver.)", section: "NÆVIS / WHIPLASH ERA", itemType: "SONG", version: "Rock Ver." },
      // SECTION 06 — AUDIENCE EVENT
      { order: 33, title: "Forever (Audience Singalong)", section: "AUDIENCE EVENT", itemType: "SPECIAL" },
      {
        order: 34, title: "Dance Challenge Medley", section: "AUDIENCE EVENT", itemType: "MEDLEY",
        medleyTracks: ["Armageddon", "Black Mamba", "Next Level", "Spicy", "Better Things", "Drama", "Hot Mess", "Supernova", "Whiplash"]
      },
      // SECTION 07 — ENCORE
      { order: 35, title: "Encore VCR — You", section: "ENCORE",             itemType: "VCR" },
      { order: 36, title: "Just Another Girl", section: "ENCORE",             itemType: "SONG" },
      { order: 37, title: "MENT 3",           section: "ENCORE",             itemType: "MENT" },
      { order: 38, title: "Melody",           section: "ENCORE",             itemType: "SONG" },
      { order: 39, title: "MENT 4",           section: "ENCORE",             itemType: "MENT" },
    ]
  },

  {
    id: "2ne1-welcome-back-encore-2025",
    title: "2025 2NE1 CONCERT [WELCOME BACK] ENCORE IN SEOUL",
    artist: "2NE1",
    tourName: "WELCOME BACK",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    eventType: "단독 콘서트 / 앙코르",
    organizer: "YG ENTERTAINMENT",
    ticketPrice: { vip: "209,000원", r: "187,000원", s: "165,000원" },
    dates: [
      { date: "2025-04-13", startTime: "17:00", day: "DAY 2" },
    ],
    poster: "public/posters/2NE1 CONCERT [WELCOME BACK] ENCORE IN SEOUL.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "출연: CL, BOM, DARA, MINZY. 공연 영상 타임스탬프 참고.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 1,  title: "COME BACK HOME (Intro)", section: "OPENING",      itemType: "SONG" },
      { order: 2,  title: "Fire",               section: "OPENING",          itemType: "SONG" },
      { order: 3,  title: "Clap Your Hands",    section: "OPENING",          itemType: "SONG" },
      { order: 4,  title: "Can't Nobody",       section: "OPENING",          itemType: "SONG" },
      // SECTION 02 — MAIN PERFORMANCE
      { order: 5,  title: "Do You Love Me",     section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 6,  title: "Falling In Love",    section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 7,  title: "I Don't Care",       section: "MAIN PERFORMANCE", itemType: "SONG" },
      // SECTION 03 — CL SOLO STAGE
      { order: 8,  title: "The Baddest Female", section: "CL SOLO STAGE",   itemType: "SONG", artistOrPerformer: "CL" },
      { order: 9,  title: "MTBD",               section: "CL SOLO STAGE",   itemType: "SONG", artistOrPerformer: "CL" },
      // SECTION 04 — FAN INTERACTION / RANDOM DANCE
      { order: 10, title: "VCR — Dance Challenge", section: "FAN INTERACTION / RANDOM DANCE", itemType: "VCR" },
      // SECTION 05 — BALLAD / VOCAL STAGE
      { order: 11, title: "Missing You",        section: "BALLAD / VOCAL STAGE", itemType: "SONG" },
      { order: 12, title: "It Hurts",           section: "BALLAD / VOCAL STAGE", itemType: "SONG" },
      { order: 13, title: "If I Were You",      section: "BALLAD / VOCAL STAGE", itemType: "SONG" },
      { order: 14, title: "Lonely",             section: "BALLAD / VOCAL STAGE", itemType: "SONG" },
      // SECTION 06 — DOCUMENTARY VCR
      { order: 15, title: "Documentary Movie",  section: "DOCUMENTARY VCR",  itemType: "VCR" },
      // SECTION 07 — MAIN PERFORMANCE
      { order: 16, title: "I Love You",         section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 17, title: "Ugly",               section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 18, title: "Gotta Be You",       section: "MAIN PERFORMANCE", itemType: "SONG" },
      // SECTION 08 — MAIN SET FINALE
      { order: 19, title: "COME BACK HOME",     section: "MAIN SET FINALE",  itemType: "SONG" },
      { order: 20, title: "I Am the Best",      section: "MAIN SET FINALE",  itemType: "SONG" },
      { order: 21, title: "Go Away",            section: "MAIN SET FINALE",  itemType: "SONG" },
      // SECTION 09 — ENCORE
      { order: 22, title: "Pretty Boy",         section: "ENCORE",           itemType: "SONG" },
      { order: 23, title: "In The Club",        section: "ENCORE",           itemType: "SONG" },
      { order: 24, title: "Don't Stop The Music", section: "ENCORE",         itemType: "SONG" },
      // SECTION 10 — SOLO STAGES
      { order: 25, title: "KISS — DARA Solo",   section: "SOLO STAGES",      itemType: "SONG", artistOrPerformer: "DARA" },
      { order: 26, title: "You & I — BOM Solo", section: "SOLO STAGES",      itemType: "SONG", artistOrPerformer: "BOM" },
      { order: 27, title: "Please Don't Go — CL & MINZY", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "CL & MINZY" },
      // SECTION 11 — PHOTO TIME
      { order: 28, title: "Photo Time",         section: "PHOTO TIME",       itemType: "SPECIAL" },
      // SECTION 12 — ENCORE MEDLEY
      { order: 29, title: "CRUSH",              section: "ENCORE MEDLEY",    itemType: "SONG" },
      { order: 30, title: "I Don't Care",       section: "ENCORE MEDLEY",    itemType: "SONG" },
      { order: 31, title: "Ugly",               section: "ENCORE MEDLEY",    itemType: "SONG" },
      { order: 32, title: "Go Away",            section: "ENCORE MEDLEY",    itemType: "SONG" },
      // SECTION 13 — FINAL PERFORMANCE
      { order: 33, title: "Can't Nobody",       section: "FINAL PERFORMANCE", itemType: "SONG" },
    ]
  },

  {
    id: "riize-riizing-loud-seoul-2025",
    title: "2025 RIIZE CONCERT TOUR [RIIZING LOUD] IN SEOUL",
    artist: "RIIZE",
    tourName: "RIIZING LOUD",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    eventType: "월드 투어 / 단독 콘서트",
    organizer: "SM ENTERTAINMENT",
    ticketPrice: { vip: "198,000원", general: "154,000원" },
    ageRating: "7세 이상",
    dates: [
      { date: "2025-07-04", startTime: "20:00", day: "DAY 1" },
      { date: "2025-07-05", startTime: "18:00", day: "DAY 2" },
      { date: "2025-07-06", startTime: "16:00", day: "DAY 3" },
    ],
    poster: "public/posters/RIIZE CONCERT TOUR [RIIZING LOUD] IN SEOUL.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "커버곡: Hug — TVXQ!, Monster — EXO. 아래 세트리스트는 2025년 7월 5일(DAY 2) 기준.",
    setlist: [
      // SECTION 01 — OPENING VCR
      { order: 0,  title: "VCR",               section: "OPENING VCR",       itemType: "VCR" },
      { order: 1,  title: "Ember to Solar",    section: "OPENING VCR",       itemType: "SONG" },
      { order: 2,  title: "Siren",             section: "OPENING VCR",       itemType: "SONG" },
      { order: 3,  title: "Odyssey",           section: "OPENING VCR",       itemType: "SONG" },
      { order: 4,  title: "Combo",             section: "OPENING VCR",       itemType: "SONG" },
      // SECTION 02 — TALK / FIRST FAN INTERACTION
      { order: 5,  title: "MENT",              section: "TALK / FIRST FAN INTERACTION", itemType: "MENT" },
      { order: 6,  title: "Memories",          section: "TALK / FIRST FAN INTERACTION", itemType: "SONG" },
      { order: 7,  title: "Be My Next (Korean Ver.)", section: "TALK / FIRST FAN INTERACTION", itemType: "SONG", version: "Korean Ver." },
      { order: 8,  title: "Lucky (Korean Ver.)", section: "TALK / FIRST FAN INTERACTION", itemType: "SONG", version: "Korean Ver." },
      // SECTION 03 — VCR
      { order: 9,  title: "VCR",              section: "VCR",                itemType: "VCR" },
      { order: 10, title: "Passage",           section: "VCR",               itemType: "SONG" },
      { order: 11, title: "Midnight Mirage",   section: "VCR",               itemType: "SONG" },
      { order: 12, title: "Hug (TVXQ! 커버)", section: "VCR",               itemType: "SONG", notes: "TVXQ! 커버" },
      { order: 13, title: "Love 119",          section: "VCR",               itemType: "SONG" },
      // SECTION 04 — MAIN PERFORMANCE
      { order: 14, title: "MENT",             section: "MAIN PERFORMANCE",   itemType: "MENT" },
      { order: 15, title: "9 Days",           section: "MAIN PERFORMANCE",   itemType: "SONG" },
      { order: 16, title: "Show Me Love",     section: "MAIN PERFORMANCE",   itemType: "SONG" },
      { order: 17, title: "Honestly",         section: "MAIN PERFORMANCE",   itemType: "SONG" },
      { order: 18, title: "Talk Saxy",        section: "MAIN PERFORMANCE",   itemType: "SONG" },
      // SECTION 05 — VCR / PERFORMANCE
      { order: 19, title: "VCR",             section: "VCR / PERFORMANCE",   itemType: "VCR" },
      { order: 20, title: "Impossible",      section: "VCR / PERFORMANCE",   itemType: "SONG" },
      { order: 21, title: "Monster (EXO 커버)", section: "VCR / PERFORMANCE", itemType: "SONG", notes: "EXO 커버" },
      { order: 22, title: "Bag Bad Back",    section: "VCR / PERFORMANCE",   itemType: "SONG" },
      // SECTION 06 — BAND PERFORMANCE
      { order: 23, title: "VCR",            section: "BAND PERFORMANCE",     itemType: "VCR" },
      { order: 24, title: "Intro + Get A Guitar", section: "BAND PERFORMANCE", itemType: "SONG" },
      { order: 25, title: "Boom Boom Bass", section: "BAND PERFORMANCE",     itemType: "SONG" },
      { order: 26, title: "Fly Up",         section: "BAND PERFORMANCE",     itemType: "SONG" },
      // SECTION 07 — FINAL TALK
      { order: 27, title: "MENT",          section: "FINAL TALK",            itemType: "MENT" },
      { order: 28, title: "Another Life",  section: "FINAL TALK",            itemType: "SONG" },
      // SECTION 08 — ENCORE
      { order: 29, title: "The End of the Day", section: "ENCORE",          itemType: "SONG" },
      { order: 30, title: "MENT",          section: "ENCORE",               itemType: "MENT" },
      { order: 31, title: "One Kiss",      section: "ENCORE",               itemType: "SONG" },
      { order: 32, title: "Inside My Love", section: "ENCORE",              itemType: "SONG" },
    ]
  },

  {
    id: "riize-riizing-loud-finale-2026",
    title: "2026 RIIZE CONCERT TOUR [RIIZING LOUD] FINALE IN SEOUL",
    artist: "RIIZE",
    tourName: "RIIZING LOUD",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    eventType: "월드 투어 / 서울 피날레",
    organizer: "SM ENTERTAINMENT",
    ticketPrice: { vip: "198,000원", general: "165,000원" },
    ageRating: "7세 이상",
    dates: [
      { date: "2026-03-06", startTime: "20:00", day: "DAY 1" },
      { date: "2026-03-07", startTime: "18:00", day: "DAY 2" },
      { date: "2026-03-08", startTime: "16:00", day: "DAY 3" },
    ],
    poster: "public/posters/RIIZE RIIZING LOUD FINALE IN SEOUL.jpg",
    sourceUrls: [],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "아래 세트리스트는 2026년 3월 7일(DAY 2) 기준. Be My Next, Lucky, All of You: 한국어 버전.",
    setlist: [
      // SECTION 01 — OPENING
      { order: 1,  title: "Bag Bad Back",      section: "OPENING",          itemType: "SONG" },
      { order: 2,  title: "Siren",             section: "OPENING",          itemType: "SONG" },
      { order: 3,  title: "Ember to Solar",    section: "OPENING",          itemType: "SONG" },
      { order: 4,  title: "Odyssey",           section: "OPENING",          itemType: "SONG" },
      // SECTION 02 — MAIN PERFORMANCE
      { order: 5,  title: "Another Life",      section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 6,  title: "Be My Next (Korean Ver.)", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Korean Ver." },
      { order: 7,  title: "Lucky (Korean Ver.)", section: "MAIN PERFORMANCE", itemType: "SONG", version: "Korean Ver." },
      { order: 8,  title: "Show Me Love",      section: "MAIN PERFORMANCE", itemType: "SONG" },
      // SECTION 03 — VCR / TRANSITION
      { order: 9,  title: "Passage (녹음 음원 재생)", section: "VCR / TRANSITION", itemType: "SONG", notes: "녹음 음원 재생" },
      // SECTION 04 — MAIN PERFORMANCE
      { order: 10, title: "Midnight Mirage",   section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 11, title: "Honestly",          section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 12, title: "Sticky Like",       section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 13, title: "Love 119",          section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 14, title: "All of You",        section: "MAIN PERFORMANCE", itemType: "SONG", version: "Korean Ver." },
      { order: 15, title: "Talk Saxy",         section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 16, title: "9 Days",            section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 17, title: "Impossible",        section: "MAIN PERFORMANCE", itemType: "SONG" },
      // SECTION 05 — FINAL PERFORMANCE
      { order: 18, title: "Something's in the Water", section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 19, title: "Fame",              section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 20, title: "Get a Guitar",      section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 21, title: "Boom Boom Bass",    section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 22, title: "Memories",          section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 23, title: "Fly Up",            section: "FINAL PERFORMANCE", itemType: "SONG" },
      // SECTION 06 — ENCORE 1
      { order: 24, title: "Combo",             section: "ENCORE 1",          itemType: "SONG" },
      { order: 25, title: "One Kiss",          section: "ENCORE 1",          itemType: "SONG" },
      { order: 26, title: "Inside My Love",    section: "ENCORE 1",          itemType: "SONG" },
      { order: 27, title: "The End of the Day", section: "ENCORE 1",         itemType: "SONG" },
      // SECTION 07 — ENCORE 2
      { order: 28, title: "HAPPY! HAPPY! HAPPY!", section: "ENCORE 2",       itemType: "SONG" },
    ]
  },

  {
    id: "twice-this-is-for-finale-2026",
    title: "TWICE 〈THIS IS FOR〉 WORLD TOUR FINALE in SEOUL",
    artist: "TWICE",
    tourName: "TWICE 〈THIS IS FOR〉 WORLD TOUR",
    venueId: "kspo",
    venueName: "KSPO DOME",
    venueAddress: "서울특별시 송파구 올림픽로 424, 올림픽공원",
    city: "서울",
    country: "대한민국",
    eventType: "월드투어 파이널 공연",
    ageRating: "만 7세 이상",
    dates: [
      { date: "2026-07-10", startTime: "19:00", day: "DAY 1" },
    ],
    poster: "public/posters/TWICE 〈THIS IS FOR〉 WORLD TOUR FINALE in SEOUL.jpg",
    sourceUrls: [
      "https://www.setlist.fm/setlist/twice/2026/kspo-dome-seoul-south-korea-4b75d742.html",
      "https://nol.yanolja.com/ticket/products/26007949"
    ],
    dataStatus: "PARTIALLY_VERIFIED",
    notes: "개인 무대는 일부 곡이 축약 버전으로 진행됨. 첫째 날 앙코르 세트리스트는 날짜별 기록 기준.",
    setlist: [
      { order: 0,  title: "FOUR (Opening VCR)", section: "OPENING",          itemType: "VCR" },
      { order: 1,  title: "THIS IS FOR",        section: "OPENING",          itemType: "SONG" },
      { order: 2,  title: "Strategy",           section: "OPENING",          itemType: "SONG" },
      { order: 3,  title: "MAKE ME GO",         section: "OPENING",          itemType: "SONG" },
      { order: 4,  title: "SET ME FREE",        section: "OPENING",          itemType: "SONG" },
      { order: 5,  title: "I CAN'T STOP ME",   section: "OPENING",          itemType: "SONG" },
      { order: 6,  title: "OPTIONS",            section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 7,  title: "MOONLIGHT SUNRISE",  section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 8,  title: "MARS",               section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 9,  title: "I GOT YOU",          section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 10, title: "Talk That Talk",     section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 11, title: "Gone",               section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 12, title: "FIREWORK",           section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 13, title: "HELL IN HEAVEN",     section: "MAIN PERFORMANCE", itemType: "SONG" },
      { order: 14, title: "RIGHT HAND GIRL",    section: "MAIN PERFORMANCE", itemType: "SONG" },
      // SOLO STAGES
      { order: 15, title: "Run Away — TZUYU Solo",     section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "TZUYU" },
      { order: 16, title: "STONE COLD — MINA Solo",    section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "MINA" },
      { order: 17, title: "ABCD — NAYEON Solo",        section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "NAYEON" },
      { order: 18, title: "FIX A DRINK — JEONGYEON Solo", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "JEONGYEON" },
      { order: 19, title: "CHESS — DAHYUN Solo",       section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "DAHYUN" },
      { order: 20, title: "SHOOT (Firecracker) — CHAEYOUNG Solo", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "CHAEYOUNG" },
      { order: 21, title: "DECAFFEINATED — SANA Solo", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "SANA" },
      { order: 22, title: "Killin' Me Good — JIHYO Solo", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "JIHYO" },
      { order: 23, title: "MOVE LIKE THAT — MOMO Solo", section: "SOLO STAGES", itemType: "SONG", artistOrPerformer: "MOMO" },
      // UNIT STAGES
      { order: 24, title: "TAKEDOWN — JEONGYEON, JIHYO, CHAEYOUNG", section: "UNIT STAGES", itemType: "SONG", artistOrPerformer: "JEONGYEON, JIHYO, CHAEYOUNG" },
      { order: 25, title: "Confetti — MISAMO (MINA, SANA, MOMO)", section: "UNIT STAGES", itemType: "SONG", artistOrPerformer: "MISAMO" },
      // MEDLEY
      {
        order: 26, title: "Title Track Medley", section: "MEDLEY", itemType: "MEDLEY",
        medleyTracks: ["TT", "Heart Shaker", "Like OOH-AHH", "YES or YES", "Dance the Night Away", "What is Love?", "CHEER UP"]
      },
      // FINAL PERFORMANCE
      { order: 27, title: "Feel Special",   section: "FINAL PERFORMANCE",   itemType: "SONG" },
      { order: 28, title: "ONE SPARK",      section: "FINAL PERFORMANCE",   itemType: "SONG" },
      { order: 29, title: "DAT AHH DAT OOH", section: "FINAL PERFORMANCE", itemType: "SONG" },
      { order: 30, title: "BATTITUDE",      section: "FINAL PERFORMANCE",   itemType: "SONG" },
      // ENCORE
      { order: 31, title: "ONE IN A MILLION", section: "ENCORE",            itemType: "SONG" },
      { order: 32, title: "JELLY JELLY",    section: "ENCORE",              itemType: "SONG" },
      { order: 33, title: "I'm Gonna Be a Star", section: "ENCORE",         itemType: "SONG" },
    ]
  },
];

// SMTOWN LIVE 2025 — 포스터 존재하나 TXT 데이터 없음 → 미등록
// 2024 KOREA GRAND MUSIC AWARDS — TXT 데이터 없음 → 미등록

const VENUES = [
  {
    id: "gocheok",
    name: "고척스카이돔",
    nameEn: "Gocheok Sky Dome",
    address: "서울특별시 구로구 경인로 430",
    city: "서울",
    country: "대한민국",
    concertIds: [
      "wanna-one-therefore-2019",
      "golden-disc-33rd-2019",
      "golden-disc-34th-2020",
      "nct-dream-show4-2025",
      "mma-17th-2025",
    ]
  },
  {
    id: "kspo",
    name: "KSPO DOME",
    nameEn: "KSPO DOME",
    address: "서울특별시 송파구 올림픽로 424",
    city: "서울",
    country: "대한민국",
    concertIds: [
      "riize-fancon-riizingday-2024",
      "aespa-synk-parallel-line-2025",
      "2ne1-welcome-back-encore-2025",
      "riize-riizing-loud-seoul-2025",
      "riize-riizing-loud-finale-2026",
      "twice-this-is-for-finale-2026",
    ]
  }
];

// Export for use in app
window.AFTERSHOW_DATA = { CONCERTS, VENUES };
