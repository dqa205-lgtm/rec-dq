
import { Place, Question } from './types';

export const PLACES: Place[] = [
  { id: 'lotteworld', name: '롯데타워 & 롯데월드', tags: ['#도심', '#실내액티비티', '#아이스링크'] },
  { id: 'sungsimdang', name: '성심당 & 대전', tags: ['#KTX여행', '#빵지순례', '#먹방'] },
  { id: 'coex', name: '코엑스', tags: ['#미식축제', '#실내몰링', '#이벤트'] },
  { id: 'starfield', name: '스타필드 위례', tags: ['#올인원몰', '#쇼핑', '#실내'] },
  { id: 'yeongjongdo', name: '영종도', tags: ['#서해바다', '#드라이브', '#해산물'] },
  { id: 'namhansanseong', name: '남한산성', tags: ['#트레킹', '#자연힐링', '#한정식'] },
  { id: 'parkhabio', name: '송파 파크하비오', tags: ['#스파찜질', '#워터파크', '#힐링'] },
];

export const QUESTIONS: Record<string, Question> = {
  'step1': {
    id: 'step1',
    question: '모임의 주된 컨셉은 무엇인가요?',
    answers: [
      { text: '활동/체험 (Activity/Experience)', nextStepId: 'step2a' },
      { text: '소비/힐링 (Consumption/Healing)', nextStepId: 'step2b' },
    ],
  },
  'step2a': {
    id: 'step2a',
    question: '어떤 환경을 선호하시나요?',
    answers: [
      { text: '도심 속 실내 액티비티', nextStepId: 'lotteworld' },
      { text: '야외에서 즐기는 자연', nextStepId: 'step3a' },
    ],
  },
  'step2b': {
    id: 'step2b',
    question: '어떤 스타일의 모임을 원하시나요?',
    answers: [
      { text: '기차타고 떠나는 당일치기 미식 여행', nextStepId: 'sungsimdang' },
      { text: '강남권 인근에서 즐기는 실내 모임', nextStepId: 'step3b' },
    ],
  },
  'step3a': {
    id: 'step3a',
    question: '바다와 산, 둘 중 어느 곳이 더 끌리나요?',
    answers: [
      { text: '시원한 바닷바람과 해산물', nextStepId: 'yeongjongdo' },
      { text: '맑은 공기 속 트레킹과 한정식', nextStepId: 'namhansanseong' },
    ],
  },
  'step3b': {
    id: 'step3b',
    question: '모임의 주목적은 무엇인가요?',
    answers: [
      { text: '다양한 이벤트와 쇼핑', nextStepId: 'step4' },
      { text: '따뜻한 곳에서 즐기는 휴식과 힐링', nextStepId: 'parkhabio' },
    ],
  },
  'step4': {
    id: 'step4',
    question: '둘 중 더 선호하는 장소는 어디인가요?',
    answers: [
      { text: '미식 축제와 랜드마크가 있는 코엑스', nextStepId: 'coex' },
      { text: '쇼핑과 편의시설을 한번에 해결하는 스타필드', nextStepId: 'starfield' },
    ],
  },
};
