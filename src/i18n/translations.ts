import { Language } from '../types/heritage';

export interface Translations {
  topRibbon: {
    unescoTitle: string;
    unescoYear: string;
    nonProfit: string;
    institution: string;
  };
  header: {
    title: string;
    subtitle: string;
    navHome: string;
    navRituals: string;
    navDistinction: string;
    navLegal: string;
    navAdvisor: string;
    navSources: string;
    navAbout: string;
    audioReaderBtn: string;
    audioReading: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroDesc: string;
    btnRituals: string;
    btnRitualsSub: string;
    btnDistinction: string;
    btnDistinctionSub: string;
    btnLegal: string;
    btnLegalSub: string;
    btnSources: string;
    btnSourcesSub: string;
    btnAdvisor: string;
    btnAdvisorSub: string;
    tamToaTitle: string;
    tamToaDesc: string;
    realmHeaven: string;
    realmHeavenTitle: string;
    realmHeavenDesc: string;
    realmForest: string;
    realmForestTitle: string;
    realmForestDesc: string;
    realmWater: string;
    realmWaterTitle: string;
    realmWaterDesc: string;
    realmEarth: string;
    realmEarthTitle: string;
    realmEarthDesc: string;
    repoTitle: string;
    repoDesc: string;
    btnNewRecord: string;
    searchPlaceholder: string;
    allLocations: string;
    allStatuses: string;
    showing: string;
    records: string;
    clearFilter: string;
    verifiedSource: string;
    missingSource: string;
    missingSourceBadge: string;
    noResults: string;
    noResultsDesc: string;
    btnDetails: string;
    btnCopyCitation: string;
    btnCopied: string;
    btnListen: string;
    btnStopListen: string;
    sourceLabel: string;
    artistsLabel: string;
    locationLabel: string;
    statusLabel: string;
    aliasLabel: string;
    close: string;
  };
  audioBar: {
    title: string;
    nowPlaying: string;
    ready: string;
    readPage: string;
    stop: string;
    pause: string;
    resume: string;
    speed: string;
    speedSlow: string;
    speedNormal: string;
    speedFast: string;
    speechSupportWarning: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    topRibbon: {
      unescoTitle: 'DI SẢN VĂN HÓA PHI VẬT THỂ ĐẠI DIỆN CỦA NHÂN LOẠI',
      unescoYear: 'UNESCO Ghi danh năm 2016',
      nonProfit: 'Dự án Xã hội Phi lợi nhuận',
      institution: 'FPT Polytechnic & IMTA TECH',
    },
    header: {
      title: 'HỒ SƠ TÍN NGƯỠNG THỜ MẪU',
      subtitle: 'Bảo tồn Di sản UNESCO • Chuẩn hóa Nghi lễ • Ngăn ngừa Biến tướng',
      navHome: 'Tổng quan & Hồ sơ',
      navRituals: 'Nghi thức chuẩn',
      navDistinction: 'Phân biệt biến tướng',
      navLegal: 'Khung pháp lý',
      navAdvisor: 'Trợ lý Tra cứu AI',
      navSources: 'Nguồn tư liệu',
      navAbout: 'Giới thiệu & Bản quyền',
      audioReaderBtn: 'Đọc thành tiếng',
      audioReading: 'Đang đọc...',
    },
    home: {
      badge: 'Hệ thống Hồ sơ Khoa học & Chuẩn hóa Nghi lễ',
      heroTitle: 'Tín Ngưỡng Thờ Mẫu Tam Phủ Của Người Việt',
      heroDesc: 'Tín ngưỡng thờ Mẫu Tam phủ tôn vinh Mẫu – người Mẹ bao dung của vũ trụ và thiên nhiên, kết tinh lòng biết ơn sâu sắc của người Việt đối với trời đất và các vị tiền nhân có công với đất nước. Cổng thông tin ra đời nhằm xây dựng hệ sinh thái thông tin chính thống, đẩy lùi biến tướng thương mại hóa, mê tín dị đoan và bảo tồn di sản theo đúng tinh thần Công ước UNESCO 2003.',
      btnRituals: 'Nghi thức chuẩn',
      btnRitualsSub: 'Không gian, y phục',
      btnDistinction: 'Chống biến tướng',
      btnDistinctionSub: 'Đối chiếu 5 dấu hiệu',
      btnLegal: 'Khung pháp lý',
      btnLegalSub: 'Luật 2016, Nghị định',
      btnSources: 'Nguồn tư liệu',
      btnSourcesSub: '8 nguồn mở được',
      btnAdvisor: 'Trợ lý Thông minh',
      btnAdvisorSub: 'Hỏi đáp từ disan.json',
      tamToaTitle: 'Khái Quát Hệ Thống Tam Tòa Thánh Mẫu & Tứ Phủ Vạn Linh',
      tamToaDesc: 'Hệ thống thần điện Đạo Mẫu Việt Nam đại diện cho vũ trụ quan hài hòa: Trời (Thiên), Rừng núi (Nhạc), Sông nước (Thoải) và Đất (Địa).',
      realmHeaven: 'Thiên Phủ (Màu Đỏ)',
      realmHeavenTitle: 'Mẫu Đệ Nhất Thượng Thiên',
      realmHeavenDesc: 'Mẫu Liễu Hạnh / Mẫu Cửu Trùng Thanh Vân. Ngự cõi Trời, ban phúc lành, cai quản các vị thần linh vùng trời, y phục sắc đỏ thắm.',
      realmForest: 'Nhạc Phủ (Màu Xanh)',
      realmForestTitle: 'Mẫu Đệ Nhị Thượng Ngàn',
      realmForestDesc: 'Lê Mại Đại Vương / Diệu Tín Thiền Sư. Cai quản miền rừng núi, che chở muôn loài, thảo mộc, bách thú; y phục sắc xanh lục.',
      realmWater: 'Thoải Phủ (Màu Trắng)',
      realmWaterTitle: 'Mẫu Đệ Tam Thoải Phủ',
      realmWaterDesc: 'Xích Lân Long Nữ. Cai quản sông ngòi, biển hồ, dòng nước tưới tiêu nông nghiệp; y phục sắc trắng tinh khôi thanh khiết.',
      realmEarth: 'Địa Phủ (Màu Vàng)',
      realmEarthTitle: 'Mẫu Đệ Tứ Địa Phủ',
      realmEarthDesc: 'Địa Tiên Thánh Mẫu. Cai quản đất đai, bờ cõi, thổ địa màu mỡ nuôi dưỡng sinh linh; y phục sắc vàng hoàng thổ.',
      repoTitle: 'Kho Dữ Liệu Hồ Sơ Di Sản Thực Hành',
      repoDesc: 'Tra cứu 16 hồ sơ thực hành, di tích đền phủ và lễ hội thờ Mẫu đã được xác thực tư liệu nguồn',
      btnNewRecord: 'Nạp bản ghi mới',
      searchPlaceholder: 'Tìm kiếm theo tên di sản, nghệ nhân, mô tả...',
      allLocations: 'Tất cả địa phương',
      allStatuses: 'Tất cả tình trạng ghi danh',
      showing: 'Hiển thị',
      records: 'hồ sơ',
      clearFilter: '(Xóa bộ lọc)',
      verifiedSource: 'Đã có tư liệu nguồn',
      missingSource: 'Thiếu tư liệu kiểm chứng',
      missingSourceBadge: 'Thiếu nguồn tư liệu',
      noResults: 'Không tìm thấy hồ sơ phù hợp',
      noResultsDesc: 'Không có bản ghi nào trùng khớp với bộ lọc hoặc từ khóa bạn nhập. Hãy thử tìm từ khóa khác hoặc xóa bộ lọc.',
      btnDetails: 'Chi tiết',
      btnCopyCitation: 'Sao chép trích dẫn nguồn',
      btnCopied: 'Đã sao chép!',
      btnListen: 'Nghe đọc',
      btnStopListen: 'Dừng nghe',
      sourceLabel: 'Nguồn tư liệu',
      artistsLabel: 'Nghệ nhân tiêu biểu',
      locationLabel: 'Địa phương',
      statusLabel: 'Tình trạng ghi danh',
      aliasLabel: 'Tên gọi khác',
      close: 'Đóng',
    },
    audioBar: {
      title: 'Chế độ hỗ trợ người cao tuổi & khiếm thị',
      nowPlaying: 'Đang đọc giọng nói',
      ready: 'Sẵn sàng đọc nội dung',
      readPage: 'Đọc tóm tắt trang',
      stop: 'Dừng',
      pause: 'Tạm dừng',
      resume: 'Tiếp tục',
      speed: 'Tốc độ',
      speedSlow: 'Chậm (0.8x)',
      speedNormal: 'Chuẩn (1.0x)',
      speedFast: 'Nhanh (1.2x)',
      speechSupportWarning: 'Trình duyệt của bạn hiện chưa hỗ trợ Web Speech Synthesis.',
    },
  },
  en: {
    topRibbon: {
      unescoTitle: 'REPRESENTATIVE INTANGIBLE CULTURAL HERITAGE OF HUMANITY',
      unescoYear: 'Inscribed by UNESCO in 2016',
      nonProfit: 'Non-profit Social Project',
      institution: 'FPT Polytechnic & IMTA TECH',
    },
    header: {
      title: 'MOTHER GODDESS WORSHIP PORTAL',
      subtitle: 'Preserving UNESCO Heritage • Standardizing Rituals • Preventing Deviation',
      navHome: 'Overview & Dossier',
      navRituals: 'Standard Rituals',
      navDistinction: 'Combating Deviation',
      navLegal: 'Legal Framework',
      navAdvisor: 'AI Heritage Assistant',
      navSources: 'Authoritative Sources',
      navAbout: 'About & Copyright',
      audioReaderBtn: 'Voice Reader (TTS)',
      audioReading: 'Reading aloud...',
    },
    home: {
      badge: 'Scientific Dossier & Ritual Standardization System',
      heroTitle: 'Practices Related to the Viet Beliefs in the Mother Goddesses of Three Realms',
      heroDesc: 'Vietnamese Mother Goddess worship (Dao Mau Tam phu) honors Mother Goddesses who embody benevolence, natural forces, and deep gratitude toward Heaven, Earth, and heroic ancestors who protected the nation. This portal provides an authoritative, standard information ecosystem to combat commercialization and superstition while safeguarding intangible heritage in accordance with the 2003 UNESCO Convention.',
      btnRituals: 'Standard Rituals',
      btnRitualsSub: 'Space & Attire',
      btnDistinction: 'Anti-Deviation',
      btnDistinctionSub: '5 Red Flags Checked',
      btnLegal: 'Legal Framework',
      btnLegalSub: 'Law & Decrees',
      btnSources: 'Sources Repository',
      btnSourcesSub: '8 Verified Links',
      btnAdvisor: 'AI Assistant',
      btnAdvisorSub: 'Q&A on disan.json',
      tamToaTitle: 'Overview of the Three Realms Mother Goddesses & Four Palaces Pantheon',
      tamToaDesc: 'The Vietnamese Mother Goddess pantheon embodies a harmonious cosmic order: Heaven (Thien), Mountains & Forests (Nhac), Waters (Thoai), and Earth (Dia).',
      realmHeaven: 'Heaven Realm (Red)',
      realmHeavenTitle: 'First Mother Goddess of Heaven',
      realmHeavenDesc: 'Mother Lieu Hanh / Cuu Trung Thanh Van. Overseeing the celestial realm, bestowing blessings and peace; attired in deep red imperial robes.',
      realmForest: 'Forest Realm (Green)',
      realmForestTitle: 'Second Mother Goddess of Highlands',
      realmForestDesc: 'Le Mai Dai Vuong / Dieu Tin Thien Su. Caring for mountain ecosystems, flora, and fauna; attired in vibrant green garments.',
      realmWater: 'Water Realm (White)',
      realmWaterTitle: 'Third Mother Goddess of Waters',
      realmWaterDesc: 'Xich Lan Long Nu. Overseeing rivers, lakes, oceans, and agricultural irrigation; attired in pure white flowing robes.',
      realmEarth: 'Earth Realm (Yellow)',
      realmEarthTitle: 'Fourth Mother Goddess of Earth',
      realmEarthDesc: 'Dia Tien Thanh Mau. Blessing fertile soils and territorial boundaries; attired in golden ochre traditional garments.',
      repoTitle: 'Verified Heritage Dossier Repository',
      repoDesc: 'Browse 16 authentic practice records, temples, and festivals authenticated by UNESCO & Ministry dossiers',
      btnNewRecord: 'Add New Record',
      searchPlaceholder: 'Search by heritage name, artists, description...',
      allLocations: 'All Locations',
      allStatuses: 'All Recognition Statuses',
      showing: 'Showing',
      records: 'records',
      clearFilter: '(Reset filters)',
      verifiedSource: 'Verified Source Citation',
      missingSource: 'Missing Verification Source',
      missingSourceBadge: 'Missing Source Citation',
      noResults: 'No matching heritage records found',
      noResultsDesc: 'No records matched your selected filters or search terms. Try different keywords or clear the filters.',
      btnDetails: 'Details',
      btnCopyCitation: 'Copy Citation',
      btnCopied: 'Copied!',
      btnListen: 'Listen Aloud',
      btnStopListen: 'Stop Audio',
      sourceLabel: 'Source Citation',
      artistsLabel: 'Key Folk Master Artists',
      locationLabel: 'Location',
      statusLabel: 'Recognition Status',
      aliasLabel: 'Alternative Name',
      close: 'Close',
    },
    audioBar: {
      title: 'Accessibility Mode for Elderly & Visually Impaired Visitors',
      nowPlaying: 'Reading aloud',
      ready: 'Ready to read content',
      readPage: 'Read Page Summary',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume',
      speed: 'Speed',
      speedSlow: 'Slow (0.8x)',
      speedNormal: 'Normal (1.0x)',
      speedFast: 'Fast (1.2x)',
      speechSupportWarning: 'Your browser does not currently support Web Speech Synthesis.',
    },
  },
};

/**
 * English translation dictionary for the 16 real heritage records in disan.json
 */
export const recordTranslationsEn: Record<string, {
  ten_chinh_thuc: string;
  ten_goi_khac: string;
  loai_hinh: string;
  dia_phuong: string;
  mo_ta_dac_trung: string;
  nghe_nhan_tieu_bieu: string;
  tinh_trang_ghi_danh: string;
  nguon_tu_lieu: string;
}> = {
  'ds-01': {
    ten_chinh_thuc: 'Len Dong (Spirit Possession) Ritual in Practices Related to the Viet Beliefs in the Mother Goddesses of Three Realms',
    ten_goi_khac: 'Hau bong, Len dong, Hau Thanh',
    loai_hinh: 'Social practices, rituals and festive events; Traditional performing arts',
    dia_phuong: 'Nationwide (Key hubs: Nam Dinh, Hanoi, Ha Nam, Hung Yen, Hai Phong, Thanh Hoa)',
    mo_ta_dac_trung: 'A comprehensive spiritual performance combining sacred Chau van music, liturgical choreography, and strict ceremonial attire following the Four Palaces color symbolism (Red - Heaven, Green - Forests, White - Waters, Yellow - Earth). Spirit mediums serve as bridges between human communities and deities, invoking deities to grant health, prosperity, and national peace.',
    nghe_nhan_tieu_bieu: 'Meritorious Artist Dang Ngoc Anh, Meritorious Artist Nguyen Tat Kim Hung, People\'s Artist Hoang Minh Do',
    tinh_trang_ghi_danh: 'Representative Intangible Cultural Heritage of Humanity (Inscribed by UNESCO in 2016)',
    nguon_tu_lieu: 'UNESCO Nomination File No. 01064 (Ministry of Culture, Sports and Tourism, 2016); Prof. Ngo Duc Thinh, "Dao Mau in Vietnam" (Social Sciences Publishing House, 2010)'
  },
  'ds-02': {
    ten_chinh_thuc: 'Phu Day Historical Architectural Complex and Festival',
    ten_goi_khac: 'Phu Day Festival, Lieu Hanh Mother Goddess Festival',
    loai_hinh: 'Traditional festival and architectural art relic',
    dia_phuong: 'Kim Thai Commune, Vu Ban District, Nam Dinh Province',
    mo_ta_dac_trung: 'The largest national center of Mother Goddess worship, held in the 3rd lunar month honoring Mother Lieu Hanh - First Mother Goddess of Heaven, one of the Four Immortals of Vietnamese folk belief. Features include scriptures welcoming processions, floral stick letter-formation competitions, orthodox spirit possession rituals, and Chau van chanting at Tien Huong, Van Cat, and the Mausoleum.',
    nghe_nhan_tieu_bieu: 'People\'s Artist Tran Thi Duyen, Temple Keeper Tran Khac Su',
    tinh_trang_ghi_danh: 'National Intangible Cultural Heritage (Decision No. 5079/QD-BVHTTDL in 2012)',
    nguon_tu_lieu: 'Department of Cultural Heritage, Ministry of Culture, Sports and Tourism (Decision 5079/QD-BVHTTDL); Vietnam National Institute of Culture and Arts Studies (VICAS)'
  },
  'ds-03': {
    ten_chinh_thuc: 'Chau Van Chanting Art of the Vietnamese People',
    ten_goi_khac: 'Van ca, Hat bong, Nam Dinh - Ha Nam Chau Van',
    loai_hinh: 'Traditional performing arts',
    dia_phuong: 'Nam Dinh, Ha Nam, Hanoi, Hai Phong, Ninh Binh',
    mo_ta_dac_trung: 'A sacred ceremonial singing art combining the moon lute (dan nguyet), bamboo clappers (phach), small drums, and cymbals to eulogize divine merits and guide mediums into spiritual ecstasy. Features canonical melodies: Doc, Con, Xa, Phu, and Ham.',
    nghe_nhan_tieu_bieu: 'Meritorious Artist Trong Quynh, Meritorious Artist Van Dai, Folk Master Pham Van Kiem',
    tinh_trang_ghi_danh: 'National Intangible Cultural Heritage (Decision No. 446/QD-BVHTTDL in 2013)',
    nguon_tu_lieu: 'Vietnam National Institute of Music; National Intangible Cultural Heritage Scientific Dossier (Ministry of Culture, Sports and Tourism)'
  },
  'ds-04': {
    ten_chinh_thuc: 'Bao Ha Temple Historical Relic and Bao Ha Temple Festival',
    ten_goi_khac: 'Lord Hoang Bay Bao Ha Temple',
    loai_hinh: 'Historical-cultural relic and traditional religious festival',
    dia_phuong: 'Bao Ha Commune, Bao Yen District, Lao Cai Province',
    mo_ta_dac_trung: 'Spiritual sanctuary honoring Lord Hoang Bay, a historic military hero who allied with northwestern ethnic minorities to defeat northern invaders under King Le Canh Hung. His spirit possession rite features purple indigo robes, tea ceremonies, and admonitions against gambling and social vices.',
    nghe_nhan_tieu_bieu: 'Bao Ha Relic Management Board and local folk artists',
    tinh_trang_ghi_danh: 'National Historical-Cultural Monument (1997); Bao Ha Festival inscribed as National Intangible Heritage (2016)',
    nguon_tu_lieu: 'Lao Cai Provincial Department of Culture and Sports; Prof. Nguyen Chi Ben, "Northwestern Intangible Heritage" (Ethnic Culture Publishing House)'
  },
  'ds-05': {
    ten_chinh_thuc: 'Song Son - Chin Gieng Temple Relic and Festival',
    ten_goi_khac: 'Song Temple Thanh Hoa, Mau Song Festival',
    loai_hinh: 'Historical-cultural monument and traditional festival',
    dia_phuong: 'Bac Son Ward, Bim Son Town, Thanh Hoa Province',
    mo_ta_dac_trung: 'Celebrated in folklore as "The Most Sacred Temple of Thanh Province", linked with manifestations of Mother Lieu Hanh and Lady Chin (Co Chin Song Son). Held annually in the 2nd lunar month with solemn processions, spirit rites, and folk performances.',
    nghe_nhan_tieu_bieu: 'Traditional Bim Son - Thanh Hoa spirit mediums and temple keepers',
    tinh_trang_ghi_danh: 'National Intangible Cultural Heritage (Decision No. 3433/QD-BVHTTDL in 2019)',
    nguon_tu_lieu: 'Department of Cultural Heritage Portal; National Museum of History; Decision 3433/QD-BVHTTDL'
  },
  'ds-06': {
    ten_chinh_thuc: 'Bac Le Temple Historical Relic and Festival',
    ten_goi_khac: 'Chau Be Bac Le Temple',
    loai_hinh: 'Religious monument and traditional festival',
    dia_phuong: 'Tan Thanh Commune, Huu Lung District, Lang Son Province',
    mo_ta_dac_trung: 'A sacred sanctuary of the Highlands Realm (Nhac Phu) worshiping the Second Mother of Highlands and Little Mistress of Bac Le. Blends Tay, Nung, and Kinh cultural motifs with indigo garments, silver buttons, and mountain forest offerings.',
    nghe_nhan_tieu_bieu: 'Lang Son Provincial Folk Artists Association',
    tinh_trang_ghi_danh: 'Provincial Historical-Cultural Monument and Exemplary Heritage Practice',
    nguon_tu_lieu: 'Lang Son Department of Culture, Sports and Tourism; Institute of Folk Culture Studies'
  },
  'ds-07': {
    ten_chinh_thuc: 'Dong Cuong National Historical-Cultural Temple',
    ten_goi_khac: 'Dong Cuong Second Mother of Highlands Temple',
    loai_hinh: 'Historical-cultural monument and traditional festival',
    dia_phuong: 'Dong Cuong Commune, Van Yen District, Yen Bai Province',
    mo_ta_dac_trung: 'Ancient temple on the Red River banks, birthsite of the Second Mother of Highlands and heroic Tran Dynasty commanders. Features buffalo sacrifice rites in early spring, river processions, and Tay-Kinh intercultural spirit performances.',
    nghe_nhan_tieu_bieu: 'Meritorious Artist Dang Ngoc Anh, Dong Cuong Relic Management Board',
    tinh_trang_ghi_danh: 'National Intangible Cultural Heritage (Decision No. 141/QD-BVHTTDL in 2023)',
    nguon_tu_lieu: 'Decision 141/QD-BVHTTDL of the Ministry of Culture, Sports and Tourism; Yen Bai Newspaper'
  },
  'ds-08': {
    ten_chinh_thuc: 'Lanh Giang National Historical-Cultural Temple',
    ten_goi_khac: 'Lanh Temple, Third Imperial Mandarin of Waters Temple',
    loai_hinh: 'Historical-cultural monument and traditional festival',
    dia_phuong: 'Moc Nam Commune, Duy Tien Town, Ha Nam Province',
    mo_ta_dac_trung: 'Central holy site of the Waters Realm (Thoai Phu) worshiping three aquatic deities of the 18th Hung King era and the Third Imperial Mandarin. Preserves holy water fetching rites on the Red River and regional boat processions.',
    nghe_nhan_tieu_bieu: 'Lanh Giang Temple Keeper and Ha Nam chau van masters',
    tinh_trang_ghi_danh: 'National Historical-Cultural Monument (1996); Lanh Giang Festival inscribed as National Intangible Heritage (2016)',
    nguon_tu_lieu: 'National Intangible Cultural Heritage Dossier No. 2970/QD-BVHTTDL; Ha Nam Department of Culture, Sports and Tourism'
  },
  'ds-09': {
    ten_chinh_thuc: 'Tranh National Historical-Cultural Temple',
    ten_goi_khac: 'Lord Tuan Tranh Temple, Ninh Giang Tranh Temple',
    loai_hinh: 'Historical architectural monument and folk festival',
    dia_phuong: 'Dong Tam Commune, Ninh Giang District, Hai Duong Province',
    mo_ta_dac_trung: 'Dedicated to the Fifth Imperial Mandarin Tuan Tranh - a loyal military guardian. Known as a major Red River Delta performance center featuring blue-robed spirit possession with dragon sword martial dances.',
    nghe_nhan_tieu_bieu: 'Tranh Temple Ritual Practitioners Association of Hai Duong',
    tinh_trang_ghi_danh: 'National Monument (2009); Tranh Temple Festival inscribed as National Intangible Heritage (2022)',
    nguon_tu_lieu: 'Decision No. 781/QD-BVHTTDL of the Ministry of Culture, Sports and Tourism; Hai Duong Museum'
  },
  'ds-10': {
    ten_chinh_thuc: 'Lord Hoang Muoi Historical Relic Temple',
    ten_goi_khac: 'Mo Hac Linh Tu, Cho Cui Temple',
    loai_hinh: 'Historical-cultural monument and folk belief',
    dia_phuong: 'Hung Thinh Commune, Hung Nguyen District, Nghe An Province',
    mo_ta_dac_trung: 'Honoring Lord Hoang Muoi (manifestation of Le Khoi / Prince Uy Minh Ly Nhat Quang), a chivalrous scholar-general protecting fishermen on the Lam River. Features golden dragon robes, poetry recitation, and lessons on filial piety.',
    nghe_nhan_tieu_bieu: 'Traditional spirit practitioners of Nghe An and Ha Tinh',
    tinh_trang_ghi_danh: 'Provincial Cultural Monument; Hoang Muoi Festival inscribed as National Intangible Heritage (2019)',
    nguon_tu_lieu: 'Decision No. 2970/QD-BVHTTDL of the Ministry of Culture, Sports and Tourism; Nghe An Portal'
  },
  'ds-11': {
    ten_chinh_thuc: 'Tay Ho Palace Historical Relic and Scenic Landscape',
    ten_goi_khac: 'Tay Ho Linh Tu, West Lake Mother Goddess Palace',
    loai_hinh: 'Historical architectural monument and Mother Goddess sanctuary',
    dia_phuong: 'Quang An Ward, Tay Ho District, Hanoi City',
    mo_ta_dac_trung: 'Sacred landmark commemorating the second earthly manifestation of Mother Lieu Hanh meeting scholar Phung Khac Khoan for poetic dialogues beside scenic West Lake. Major pilgrimage site for Hanoi citizens seeking peace and well-being.',
    nghe_nhan_tieu_bieu: 'Tay Ho Palace Management Board, Temple Keeper Truong Duc Thuan',
    tinh_trang_ghi_danh: 'National Historical-Cultural Monument (Decision No. 521/VH-QD in 1996)',
    nguon_tu_lieu: 'Hanoi Department of Culture and Sports; Prof. Ngo Duc Thinh, "Hanoi Temples and Palaces System" (Hanoi Publishing House)'
  },
  'ds-12': {
    ten_chinh_thuc: 'Ha, Thuong, and Y La Temples Relic Complex',
    ten_goi_khac: 'Tuyen Quang Mother Goddess Temples Complex',
    loai_hinh: 'Historical-cultural monument and traditional festival',
    dia_phuong: 'Tuyen Quang City, Tuyen Quang Province',
    mo_ta_dac_trung: 'Tri-temple complex dedicated to the Mother of Waters and Mother of Highlands, linked with the legends of princesses Phuong Dung and Ngoc Lan. Famous for the grand procession linking all three temples across the Lo River.',
    nghe_nhan_tieu_bieu: 'Tuyen Quang City Folk Artists Association',
    tinh_trang_ghi_danh: 'National Intangible Cultural Heritage (Decision No. 4465/QD-BVHTTDL in 2017)',
    nguon_tu_lieu: 'Decision 4465/QD-BVHTTDL of the Ministry of Culture, Sports and Tourism; Tuyen Quang Museum'
  },
  'ds-13': {
    ten_chinh_thuc: 'Dau Temple and Quan Chao Temple Historical Relic',
    ten_goi_khac: 'Dau Tam Diep Temple, Mau Tam Diep Temple',
    loai_hinh: 'Historical-cultural monument and folk festival',
    dia_phuong: 'Tay Son Ward, Tam Diep City, Ninh Binh Province',
    mo_ta_dac_trung: 'Legendary temple where Mother Lieu Hanh manifested as a porridge vendor assisting King Quang Trung\'s Tay Son army before their historic victory against 290,000 Qing invaders in spring 1789.',
    nghe_nhan_tieu_bieu: 'Tam Diep - Ninh Binh spirit mediums and ritual masters',
    tinh_trang_ghi_danh: 'National Historical-Cultural Monument (Decision in 1993)',
    nguon_tu_lieu: 'Ninh Binh Tourism Department; Hoa Lu Ancient Capital Heritage Conservation Center'
  },
  'ds-14': {
    ten_chinh_thuc: 'Suoi Mo Scenic Historical Relic and Festival',
    ten_goi_khac: 'Suoi Mo Bac Giang Temple',
    loai_hinh: 'Scenic historical monument and traditional festival',
    dia_phuong: 'Nghia Phuong Commune, Luc Nam District, Bac Giang Province',
    mo_ta_dac_trung: 'Dedicated to Mother of Highlands Que My Nuong, daughter of the 16th Hung King, who broke river barriers to end severe drought and bring fertile streams to villagers. Comprises Lower, Middle, and Upper temples along waterfalls.',
    nghe_nhan_tieu_bieu: 'Suoi Mo Ecological Tourism and Relic Management Board',
    tinh_trang_ghi_danh: 'National Monument (1988); Suoi Mo Festival inscribed as National Intangible Heritage (2015)',
    nguon_tu_lieu: 'Decision No. 4501/QD-BVHTTDL of the Ministry of Culture, Sports and Tourism; Bac Giang Portal'
  },
  'ds-15': {
    ten_chinh_thuc: 'Rung Temple and Mau Thoai Gia Lam Temple Historical Relic',
    ten_goi_khac: 'Rung Long Bien Temple, Bac Bien Mother Temple',
    loai_hinh: 'Four Palaces sanctuary and folk festival',
    dia_phuong: 'Ngoc Thuy and Bo De Wards, Long Bien District, Hanoi City',
    mo_ta_dac_trung: 'Riverside temple complex preserving holy spaces for Mother of Waters and Highlands Mistress, eulogizing deities for protecting ancient Thang Long peri-urban communities from flood calamities.',
    nghe_nhan_tieu_bieu: 'Long Bien District ritual masters and folk artists',
    tinh_trang_ghi_danh: 'Hanoi City Historical-Cultural Monument',
    nguon_tu_lieu: 'Hanoi Department of Culture and Sports; Vietnam National Institute of Culture and Arts Studies (VICAS)'
  },
  'ds-16': {
    ten_chinh_thuc: 'Water Fetching and Floral Stick Letter-Formation (Keo Chu) Rituals in Mother Goddess Festivals',
    ten_goi_khac: 'Phu Day Letter Formation, Water Fetching Ceremony',
    loai_hinh: 'Social practices and ritual folk game performance',
    dia_phuong: 'Nam Dinh, Ha Nam, Ninh Binh',
    mo_ta_dac_trung: 'Core traditional rites: Holy Water Fetching symbolizes prayers for favorable weather and bountiful harvests; Letter-formation mobilizes hundreds of youths holding floral sticks to form sacred Sino-Vietnamese characters like "Mau Nghi Thien Ha" (Mother of the Realm) and "Quoc Thai Dan An" (Peace for the Nation).',
    nghe_nhan_tieu_bieu: 'Communal ritual elders of Vu Ban and Y Yen (Nam Dinh)',
    tinh_trang_ghi_danh: 'Core ceremonial element in UNESCO Representative Intangible Heritage (2016)',
    nguon_tu_lieu: 'UNESCO Nomination File "Practices related to the Viet beliefs in the Mother Goddesses of Three Realms" (2016); Vietnam Museum of Ethnology'
  }
};
