export const REGIONS = [
  { value: 'seoul',     label: '서울특별시',       bondRate: 0.12, discountRate: 0.025 },
  { value: 'busan',     label: '부산광역시',       bondRate: 0.09, discountRate: 0.025 },
  { value: 'daegu',     label: '대구광역시',       bondRate: 0.09, discountRate: 0.025 },
  { value: 'incheon',   label: '인천광역시',       bondRate: 0.09, discountRate: 0.025 },
  { value: 'gwangju',   label: '광주광역시',       bondRate: 0.07, discountRate: 0.025 },
  { value: 'daejeon',   label: '대전광역시',       bondRate: 0.07, discountRate: 0.025 },
  { value: 'ulsan',     label: '울산광역시',       bondRate: 0.07, discountRate: 0.025 },
  { value: 'sejong',    label: '세종특별자치시',   bondRate: 0.05, discountRate: 0.025 },
  { value: 'gyeonggi',  label: '경기도',           bondRate: 0.08, discountRate: 0.025 },
  { value: 'gangwon',   label: '강원특별자치도',   bondRate: 0.05, discountRate: 0.025 },
  { value: 'chungbuk',  label: '충청북도',         bondRate: 0.05, discountRate: 0.025 },
  { value: 'chungnam',  label: '충청남도',         bondRate: 0.05, discountRate: 0.025 },
  { value: 'jeonbuk',   label: '전북특별자치도',   bondRate: 0.05, discountRate: 0.025 },
  { value: 'jeonnam',   label: '전라남도',         bondRate: 0.05, discountRate: 0.025 },
  { value: 'gyeongbuk', label: '경상북도',         bondRate: 0.05, discountRate: 0.025 },
  { value: 'gyeongnam', label: '경상남도',         bondRate: 0.05, discountRate: 0.025 },
  { value: 'jeju',      label: '제주특별자치도',   bondRate: 0.07, discountRate: 0.025 },
] as const

export type RegionValue = typeof REGIONS[number]['value']
