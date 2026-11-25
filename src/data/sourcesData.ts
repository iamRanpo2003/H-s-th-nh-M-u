import { SourceReference } from '../types/heritage';

export interface ContributorAcknowledgment {
  id: string;
  name: string;
  role: string;
  contribution: string;
  permittedScope: string;
}

export const sourcesList: SourceReference[] = [
  {
    id: 'src-01',
    title: 'Practices related to the Viet beliefs in the Mother Goddesses of Three Realms (Hồ sơ UNESCO số 01064)',
    publisher: 'UNESCO Intangible Cultural Heritage & Bộ Văn hóa, Thể thao và Du lịch Việt Nam',
    year: '2016',
    type: 'chinh_thong',
    typeLabel: 'Tổ chức Quốc tế UNESCO',
    description:
      'Văn kiện chính thức của UNESCO ghi danh Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt là Di sản văn hóa phi vật thể đại diện của nhân loại tại Kỳ họp thứ 11 Ủy ban Liên Chính phủ.',
    url: 'https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064',
    isOfficialGov: true,
  },
  {
    id: 'src-02',
    title: 'Hệ thống Dữ liệu Di sản Văn hóa Phi vật thể Quốc gia (các Quyết định ghi danh 5079, 446, 4501, 4465, 3433, 2970, 781, 141/QĐ-BVHTTDL và QĐ 521/VH-QĐ)',
    publisher: 'Cục Di sản Văn hóa – Bộ Văn hóa, Thể thao và Du lịch',
    year: '1996 – 2023 (tùy từng quyết định công nhận di sản)',
    type: 'chinh_thong',
    typeLabel: 'Cơ quan Quản lý Nhà nước',
    description:
      'Cổng thông tin chuyên ngành lưu trữ hệ thống quyết định công nhận di tích và di sản văn hóa phi vật thể quốc gia cho Phủ Dầy, Hát Chầu Văn, Đền Suối Mỡ, Cụm Đền Mẫu Tuyên Quang, Đền Sòng Sơn, Đền Lảnh Giang, Đền Ông Hoàng Mười, Đền Tranh, Đền Đông Cuông và Phủ Tây Hồ.',
    url: 'http://dsvh.gov.vn/',
    isOfficialGov: true,
  },
  {
    id: 'src-03',
    title: 'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14',
    publisher: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (Cổng Thông tin Chính phủ)',
    year: '2016',
    type: 'chinh_thong',
    typeLabel: 'Văn bản Luật Quốc gia',
    description:
      'Văn bản luật quy định về quyền tự do tín ngưỡng, tôn giáo (Điều 6), đăng ký hoạt động tín ngưỡng (Điều 12, Điều 13) và hành vi bị nghiêm cấm như lợi dụng hoạt động tín ngưỡng để trục lợi (Điều 5).',
    url: 'https://vanban.chinhphu.vn/?pageid=27160&docid=187425',
    isOfficialGov: true,
  },
  {
    id: 'src-04',
    title: 'Nghị định số 38/2021/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực văn hóa và quảng cáo',
    publisher: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (đăng tải trên Cổng Bộ VHTTDL)',
    year: '2021',
    type: 'chinh_thong',
    typeLabel: 'Nghị định của Chính phủ',
    description:
      'Quy định chế tài xử phạt hành chính đối với hành vi lợi dụng hoạt động lên đồng, xem bói, gọi hồn để trục lợi (Điều 14), mức phạt tiền và biện pháp buộc nộp lại số lợi bất hợp pháp.',
    url: 'https://bvhttdl.gov.vn/ (trang chủ Bộ VHTTDL; đường dẫn trực tiếp văn bản: [CẦN BỔ SUNG])',
    isOfficialGov: true,
  },
  {
    id: 'src-05',
    title: 'Nghị định số 110/2018/NĐ-CP quy định về quản lý và tổ chức lễ hội',
    publisher: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    year: '2018',
    type: 'chinh_thong',
    typeLabel: 'Nghị định của Chính phủ',
    description:
      'Quy định nguyên tắc tổ chức lễ hội trang trọng theo nghi thức truyền thống, bảo đảm an ninh trật tự, phòng chống cháy nổ và nghiêm cấm lợi dụng lễ hội để thương mại hóa, trục lợi.',
    url: '[CẦN BỔ SUNG]',
    isOfficialGov: true,
  },
  {
    id: 'src-06',
    title: 'Bộ luật Hình sự (Điều 320 – Tội hành nghề mê tín, dị đoan)',
    publisher: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    year: '[CẦN BỔ SUNG]',
    type: 'chinh_thong',
    typeLabel: 'Văn bản Luật Quốc gia',
    description:
      'Căn cứ xử lý hình sự được trích dẫn trong mục Khung pháp lý của ứng dụng đối với hành vi dùng bói toán, đồng bóng hoặc các hình thức mê tín, dị đoan khác gây hậu quả nghiêm trọng hoặc đã bị xử phạt hành chính.',
    url: '[CẦN BỔ SUNG]',
    isOfficialGov: true,
  },
  {
    id: 'src-07',
    title: 'Công trình Nghiên cứu Khoa học và Kỷ yếu Hội thảo Di sản Đạo Mẫu',
    publisher: 'Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS)',
    year: '[CẦN BỔ SUNG]',
    type: 'hoc_thuat',
    typeLabel: 'Cơ quan Nghiên cứu Khoa học',
    description:
      'Đơn vị nghiên cứu khoa học trực thuộc Bộ VHTTDL chủ trì khảo sát thực địa, lập Hồ sơ quốc gia đệ trình UNESCO và xuất bản kỷ yếu hội thảo về Thực hành Tín ngưỡng thờ Mẫu.',
    url: 'http://vicas.org.vn/',
    isOfficialGov: false,
  },
  {
    id: 'src-08',
    title: 'Bộ Khảo Cứu: "Đạo Mẫu ở Việt Nam", "Đạo Mẫu và các hình thức thờ cúng Nữ thần, Thánh Mẫu ở Việt Nam", "Hệ thống Đền Phủ Hà Nội"',
    publisher: 'Cố GS. Ngô Đức Thịnh – NXB Khoa học Xã hội; NXB Hà Nội (tra cứu thư mục Thư viện Quốc gia)',
    year: '1996, 2010',
    type: 'hoc_thuat',
    typeLabel: 'Học thuật Dân gian Việt Nam',
    description:
      'Công trình nghiên cứu nền tảng về hệ thống thần điện Tứ phủ, triết lý Mẹ, nghi lễ lên đồng và di tích đền phủ tại Việt Nam.',
    url: 'http://nlv.gov.vn/ (Thư viện Quốc gia; liên kết từng ấn phẩm: [CẦN BỔ SUNG])',
    isOfficialGov: false,
  },
  {
    id: 'src-09',
    title: 'Chuyên đề Trưng bày: "Tín ngưỡng Thờ Mẫu – Tâm • Đẹp • Vui"',
    publisher: 'Bảo tàng Phụ nữ Việt Nam',
    year: '[CẦN BỔ SUNG]',
    type: 'bao_tang_vien',
    typeLabel: 'Bảo tàng Quốc gia',
    description:
      'Không gian trưng bày chuyên đề giới thiệu hiện vật, y phục Tứ phủ, tranh thờ, đạo cụ hầu đồng và tư liệu tôn vinh vai trò người phụ nữ trong tín ngưỡng dân gian.',
    url: 'https://baotangphunu.org.vn/',
    isOfficialGov: false,
  },
  {
    id: 'src-10',
    title: 'Kho Tư liệu Âm thanh & Ký âm Hát Chầu Văn Cổ truyền',
    publisher: 'Viện Âm nhạc Quốc gia Việt Nam',
    year: '[CẦN BỔ SUNG]',
    type: 'bao_tang_vien',
    typeLabel: 'Viện Âm nhạc Quốc gia',
    description:
      'Tài liệu nghiên cứu, tuyển tập hát văn nghi lễ đền phủ Bắc Bộ và tư liệu làn điệu Dọc, Cờn, Xá, Phú, Hãm làm chuẩn mực đối chiếu bảo tồn.',
    url: 'http://vienamnhac.vn/',
    isOfficialGov: false,
  },
  {
    id: 'src-11',
    title: 'Di sản văn hóa phi vật thể Tây Bắc & Tư liệu Đền Bảo Hà',
    publisher: 'GS.TS Nguyễn Chí Bền (NXB Văn hóa Dân tộc) & Sở Văn hóa và Thể thao tỉnh Lào Cai',
    year: '[CẦN BỔ SUNG]',
    type: 'hoc_thuat',
    typeLabel: 'Nghiên cứu & Cơ quan Địa phương',
    description:
      'Nguồn tư liệu được dẫn trong hồ sơ Di tích Lịch sử Đền Bảo Hà và Lễ hội Đền Bảo Hà (Quan Hoàng Bảy).',
    url: '[CẦN BỔ SUNG]',
    isOfficialGov: false,
  },
  {
    id: 'src-12',
    title: 'Tư liệu di tích và lễ hội thờ Mẫu tại các bảo tàng ngành và cơ quan văn hóa địa phương',
    publisher:
      'Bảo tàng Lịch sử Quốc gia; Bảo tàng Dân tộc học Việt Nam; Viện Nghiên cứu Văn hóa Dân gian; Sở VHTT Hà Nội; Sở VHTTDL Hà Nam, Lạng Sơn; Sở Du lịch Ninh Bình & TT Bảo tồn Di tích Cố đô Hoa Lư; Bảo tàng Hải Dương, Tuyên Quang; Cổng TTĐT Bắc Giang, Nghệ An; Báo Yên Bái',
    year: '[CẦN BỔ SUNG]',
    type: 'bao_tang_vien',
    typeLabel: 'Bảo tàng & Cơ quan Địa phương',
    description:
      'Tập hợp các nguồn dẫn được ghi nhận trong 16 bản ghi di sản của tệp dữ liệu disan.json phục vụ mô tả đặc trưng từng đền, phủ, lễ hội.',
    url: '[CẦN BỔ SUNG]',
    isOfficialGov: false,
  },
];

export const contributorAcknowledgments: ContributorAcknowledgment[] = [
  {
    id: 'contrib-01',
    name: 'Các nhà khoa học và đơn vị nghiên cứu (Cố GS. Ngô Đức Thịnh, GS.TS Nguyễn Chí Bền, VICAS, Viện Âm nhạc Quốc gia, Viện Nghiên cứu Văn hóa Dân gian)',
    role: 'Tác giả công trình nghiên cứu & hồ sơ khoa học',
    contribution:
      'Cung cấp nền tảng học thuật về thần điện Tứ phủ, diễn xướng hầu đồng, âm nhạc Chầu văn và hồ sơ khoa học di sản văn hóa.',
    permittedScope:
      'Trích dẫn phục vụ học tập, nghiên cứu khoa học và phổ biến kiến thức bảo tồn di sản phi lợi nhuận; ghi rõ tên tác giả, tên công trình.',
  },
  {
    id: 'contrib-02',
    name: 'Các cơ quan quản lý văn hóa và bảo tàng (UNESCO, Cục Di sản Văn hóa, Bảo tàng Phụ nữ Việt Nam, Bảo tàng Lịch sử Quốc gia, Bảo tàng Dân tộc học Việt Nam, Sở VHTT/Sở VHTTDL địa phương)',
    role: 'Cơ quan ban hành hồ sơ di sản & văn bản quy phạm pháp luật',
    contribution:
      'Cung cấp thông tin quyết định ghi danh di sản, văn bản pháp luật về tín ngưỡng, lễ hội và tư liệu trưng bày hiện vật.',
    permittedScope:
      'Sử dụng cho mục đích tuyên truyền tuân thủ pháp luật, giáo dục cộng đồng và tra cứu công khai; không sử dụng vào mục đích thương mại.',
  },
  {
    id: 'contrib-03',
    name: 'Các nghệ nhân nhân dân, nghệ nhân ưu tú, thủ nhang và ban quản lý di tích được ghi danh trong hồ sơ công khai',
    role: 'Chủ thể thực hành & gìn giữ di sản tại cộng đồng',
    contribution:
      'Tên tuổi và thực hành tiêu biểu được ghi nhận từ hồ sơ công khai (NNND Trần Thị Duyên, NNƯT Đặng Ngọc Anh, NNƯT Nguyễn Tất Kim Hùng, NNND Hoàng Minh Đỗ, NNƯT Trọng Quỳnh, NNƯT Văn Đài, Nghệ nhân Phạm Văn Kiêm, Thủ nhang Trần Khắc Sự, Thủ nhang Trương Đức Thuận và các ban tế tự địa phương).',
    permittedScope:
      'Chỉ công bố thông tin đã công khai trong hồ sơ di sản; tuyệt đối không công bố thông tin đời tư, số điện thoại cá nhân hoặc nội dung người giữ tư liệu đề nghị không công bố.',
  },
  {
    id: 'contrib-04',
    name: 'Nhóm sinh viên thực hiện dự án: Nguyễn Viết Hải (MSV: PH63500) – Nhóm 01',
    role: 'Tổng hợp dữ liệu & xây dựng cổng thông tin thực tập',
    contribution:
      'Biên tập cơ sở dữ liệu mở disan.json, xây dựng giao diện song ngữ, chế độ đọc tiếng Việt trợ năng và công cụ đối chiếu văn bản trong chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.',
    permittedScope:
      'Dự án xã hội phi lợi nhuận; dữ liệu xuất ra tuân theo tinh thần Creative Commons CC BY-NC-ND 4.0 (Ghi công – Phi thương mại – Không phái sinh).',
  },
];
