const BASE_URL = import.meta.env.BASE_URL;

export const SOUNDS_DATA = [
  // Vowels
  { id: 'a', romaji: 'a', hiragana: 'あ', katakana: 'ア', audio: `${BASE_URL}mp3/a.mp3` },
  { id: 'i', romaji: 'i', hiragana: 'い', katakana: 'イ', audio: `${BASE_URL}mp3/i.mp3` },
  { id: 'u', romaji: 'u', hiragana: 'う', katakana: 'ウ', audio: `${BASE_URL}mp3/u.mp3` },
  { id: 'e', romaji: 'e', hiragana: 'え', katakana: 'エ', audio: `${BASE_URL}mp3/e.mp3` },
  { id: 'o', romaji: 'o', hiragana: 'お', katakana: 'オ', audio: `${BASE_URL}mp3/o.mp3` },

  // K-row
  { id: 'ka', romaji: 'ka', hiragana: 'か', katakana: 'カ', audio: `${BASE_URL}mp3/ka.mp3` },
  { id: 'ki', romaji: 'ki', hiragana: 'き', katakana: 'キ', audio: `${BASE_URL}mp3/ki.mp3` },
  { id: 'ku', romaji: 'ku', hiragana: 'く', katakana: 'ク', audio: `${BASE_URL}mp3/ku.mp3` },
  { id: 'ke', romaji: 'ke', hiragana: 'け', katakana: 'ケ', audio: `${BASE_URL}mp3/ke.mp3` },
  { id: 'ko', romaji: 'ko', hiragana: 'こ', katakana: 'コ', audio: `${BASE_URL}mp3/ko.mp3` },

  // S-row
  { id: 'sa', romaji: 'sa', hiragana: 'さ', katakana: 'サ', audio: `${BASE_URL}mp3/sa.mp3` },
  { id: 'si', romaji: 'si', hiragana: 'し', katakana: 'シ', audio: `${BASE_URL}mp3/si.mp3` },
  { id: 'su', romaji: 'su', hiragana: 'す', katakana: 'ス', audio: `${BASE_URL}mp3/su.mp3` },
  { id: 'se', romaji: 'se', hiragana: 'せ', katakana: 'セ', audio: `${BASE_URL}mp3/se.mp3` },
  { id: 'so', romaji: 'so', hiragana: 'そ', katakana: 'ソ', audio: `${BASE_URL}mp3/so.mp3` },

  // T-row
  { id: 'ta', romaji: 'ta', hiragana: 'た', katakana: 'タ', audio: `${BASE_URL}mp3/ta.mp3` },
  { id: 'ti', romaji: 'ti', hiragana: 'ち', katakana: 'チ', audio: `${BASE_URL}mp3/ti.mp3` },
  { id: 'tu', romaji: 'tu', hiragana: 'つ', katakana: 'ツ', audio: `${BASE_URL}mp3/tu.mp3` },
  { id: 'te', romaji: 'te', hiragana: 'て', katakana: 'テ', audio: `${BASE_URL}mp3/te.mp3` },
  { id: 'to', romaji: 'to', hiragana: 'と', katakana: 'ト', audio: `${BASE_URL}mp3/to.mp3` },

  // N-row
  { id: 'na', romaji: 'na', hiragana: 'な', katakana: 'ナ', audio: `${BASE_URL}mp3/na.mp3` },
  { id: 'ni', romaji: 'ni', hiragana: 'に', katakana: 'ニ', audio: `${BASE_URL}mp3/ni.mp3` },
  { id: 'nu', romaji: 'nu', hiragana: 'ぬ', katakana: 'ヌ', audio: `${BASE_URL}mp3/nu.mp3` },
  { id: 'ne', romaji: 'ne', hiragana: 'ね', katakana: 'ネ', audio: `${BASE_URL}mp3/ne.mp3` },
  { id: 'no', romaji: 'no', hiragana: 'の', katakana: 'ノ', audio: `${BASE_URL}mp3/no.mp3` },

  // H-row
  { id: 'ha', romaji: 'ha', hiragana: 'は', katakana: 'ハ', audio: `${BASE_URL}mp3/ha.mp3` },
  { id: 'hi', romaji: 'hi', hiragana: 'ひ', katakana: 'ヒ', audio: `${BASE_URL}mp3/hi.mp3` },
  { id: 'hu', romaji: 'hu', hiragana: 'ふ', katakana: 'フ', audio: `${BASE_URL}mp3/hu.mp3` },
  { id: 'he', romaji: 'he', hiragana: 'へ', katakana: 'ヘ', audio: `${BASE_URL}mp3/he.mp3` },
  { id: 'ho', romaji: 'ho', hiragana: 'ほ', katakana: 'ホ', audio: `${BASE_URL}mp3/ho.mp3` },

  // M-row
  { id: 'ma', romaji: 'ma', hiragana: 'ま', katakana: 'マ', audio: `${BASE_URL}mp3/ma.mp3` },
  { id: 'mi', romaji: 'mi', hiragana: 'み', katakana: 'ミ', audio: `${BASE_URL}mp3/mi.mp3` },
  { id: 'mu', romaji: 'mu', hiragana: 'む', katakana: 'ム', audio: `${BASE_URL}mp3/mu.mp3` },
  { id: 'me', romaji: 'me', hiragana: 'め', katakana: 'メ', audio: `${BASE_URL}mp3/me.mp3` },
  { id: 'mo', romaji: 'mo', hiragana: 'も', katakana: 'モ', audio: `${BASE_URL}mp3/mo.mp3` },

  // Y-row
  { id: 'ya', romaji: 'ya', hiragana: 'や', katakana: 'ヤ', audio: `${BASE_URL}mp3/ya.mp3` },
  { id: 'yu', romaji: 'yu', hiragana: 'ゆ', katakana: 'ユ', audio: `${BASE_URL}mp3/yu.mp3` },
  { id: 'yo', romaji: 'yo', hiragana: 'よ', katakana: 'ヨ', audio: `${BASE_URL}mp3/yo.mp3` },

  // R-row
  { id: 'ra', romaji: 'ra', hiragana: 'ら', katakana: 'ラ', audio: `${BASE_URL}mp3/ra.mp3` },
  { id: 'ri', romaji: 'ri', hiragana: 'り', katakana: 'リ', audio: `${BASE_URL}mp3/ri.mp3` },
  { id: 'ru', romaji: 'ru', hiragana: 'る', katakana: 'ル', audio: `${BASE_URL}mp3/ru.mp3` },
  { id: 're', romaji: 're', hiragana: 'れ', katakana: 'レ', audio: `${BASE_URL}mp3/re.mp3` },
  { id: 'ro', romaji: 'ro', hiragana: 'ろ', katakana: 'ロ', audio: `${BASE_URL}mp3/ro.mp3` },

  // W-row
  { id: 'wa', romaji: 'wa', hiragana: 'わ', katakana: 'ワ', audio: `${BASE_URL}mp3/wa.mp3` },
  { id: 'wo', romaji: 'wo', hiragana: 'を', katakana: 'ヲ', audio: `${BASE_URL}mp3/wo.mp3` },

  // N
  { id: 'n', romaji: 'n', hiragana: 'ん', katakana: 'ン', audio: `${BASE_URL}mp3/n.mp3` },
];

export const QUIZ_TYPES = {
  ROMAJI: 'romaji',
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  AUDIO: 'audio'
};

export const QUIZ_TYPE_LABELS = {
  romaji: '罗马音',
  hiragana: '平假名',
  katakana: '片假名',
  audio: '语音'
};
