export interface Question {
  id: string;
  type: string;
  question: string;
  options: string[];
  answer: string;
  imageUrl?: string;
  explanation?: string;
}

// Helper
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const generateVerbal = (): Question => {
  const subjects = ['Pemerintah', 'Bank Indonesia', 'Perusahaan', 'Karyawan', 'Ekonom', 'Investor'];
  const actions = ['menaikkan', 'menurunkan', 'mempertahankan', 'mengevaluasi'];
  const objects = ['suku bunga', 'pajak', 'subsidi', 'harga saham', 'target inflasi'];
  
  const sub = randomChoice(subjects);
  const act = randomChoice(actions);
  const obj = randomChoice(objects);
  
  const condition = `Jika ${sub.toLowerCase()} ${act} ${obj}, maka dampaknya akan dirasakan oleh pasar.`;
  const text = `Pada kuartal ini, diketahui bahwa ${sub} memutuskan untuk ${act} ${obj}. ${condition}`;

  const type = randomChoice(['benar', 'salah', 'tdp']);
  let questionStr = '';
  let answer = '';

  if (type === 'benar') {
    questionStr = `${sub} telah ${act} ${obj}.`;
    answer = 'Benar';
  } else if (type === 'salah') {
    const wrongAct = act === 'menaikkan' ? 'menurunkan' : 'menaikkan';
    questionStr = `${sub} telah ${wrongAct} ${obj}.`;
    answer = 'Salah';
  } else {
    questionStr = `Pasar merespons positif keputusan ${sub} terkait ${obj}.`;
    answer = 'Tidak Dapat Ditentukan';
  }

  return {
    id: `v-${Date.now()}-${Math.random()}`,
    type: 'verbal',
    question: text + '\n\nPernyataan: ' + questionStr,
    options: ['Benar', 'Salah', 'Tidak Dapat Ditentukan'],
    answer,
    explanation: type === 'tdp' ? 'Teks tidak menyebutkan apakah respons pasar positif atau negatif.' : type === 'benar' ? 'Sesuai dengan kalimat pertama pada teks.' : 'Bertentangan dengan kalimat pertama pada teks.'
  };
};

export const generateNumerikal = (): Question => {
  const types = ['arithmetic', 'geometric', 'fibonacci'];
  const type = randomChoice(types);
  let sequence: number[] = [];
  let answerNum = 0;

  if (type === 'arithmetic') {
    const start = randomInt(1, 20);
    const step = randomInt(2, 9);
    for (let i = 0; i < 5; i++) sequence.push(start + (i * step));
    answerNum = start + (5 * step);
  } else if (type === 'geometric') {
    const start = randomInt(2, 5);
    const step = randomInt(2, 3);
    for (let i = 0; i < 5; i++) sequence.push(start * Math.pow(step, i));
    answerNum = start * Math.pow(step, 5);
  } else {
    // fibonacci like
    let a = randomInt(1, 5);
    let b = randomInt(1, 5);
    sequence.push(a, b);
    for (let i = 2; i < 5; i++) {
      const next = sequence[i-1] + sequence[i-2];
      sequence.push(next);
    }
    answerNum = sequence[4] + sequence[3];
  }

  let options = new Set<number>();
  options.add(answerNum);
  while (options.size < 5) {
    const offset = randomInt(-5, 5);
    if (offset !== 0 && answerNum + offset > 0) {
      options.add(answerNum + offset);
    }
  }

  const shuffledOptions = shuffle(Array.from(options)).map(String);

  return {
    id: `n-${Date.now()}-${Math.random()}`,
    type: 'numerikal',
    question: sequence.join(', ') + ', ...?',
    options: shuffledOptions,
    answer: String(answerNum)
  };
};

export const generateDigitSimbol = (): Question => {
  const chars = ['C', 'F', 'H', 'K', 'M', 'N', 'S', 'T', 'U', 'V', 'X', 'Y'];
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  const len = 5;
  let code = '';
  let ans = '';
  
  // Create a mapping just for this question
  const mapping: Record<string, string> = {};
  const selectedChars = shuffle([...chars]).slice(0, 9);
  const selectedNums = shuffle([...nums]).slice(0, 9);
  
  for(let i=0; i<9; i++) {
    mapping[selectedChars[i]] = selectedNums[i];
  }

  for (let i = 0; i < len; i++) {
    const char = randomChoice(selectedChars);
    code += char;
    ans += mapping[char];
  }

  let options = new Set<string>();
  options.add(ans);
  while(options.size < 5) {
    let wrongAns = '';
    for(let i=0; i<len; i++) {
      wrongAns += randomChoice(selectedNums);
    }
    options.add(wrongAns);
  }
  
  const mapStr = selectedChars.map((c, i) => `${c}=${selectedNums[i]}`).join(' | ');

  return {
    id: `ds-${Date.now()}-${Math.random()}`,
    type: 'digitsimbol',
    question: `KUNCI: [ ${mapStr} ]\n\nSandi: ${code}`,
    options: shuffle(Array.from(options)),
    answer: ans
  };
};

// Simplified text-based diagram logic for MVP
export const generateDiagram = (): Question => {
  const shapes = ['Segitiga', 'Kotak', 'Lingkaran'];
  const colors = ['Hitam', 'Putih', 'Abu-abu'];
  
  const shape = randomChoice(shapes);
  const color = randomChoice(colors);
  
  const isSetX = color === 'Hitam'; 
  const isSetY = color === 'Putih';
  
  let answer = 'A';
  if (isSetX) answer = 'X';
  else if (isSetY) answer = 'Y';
  else answer = 'Keduanya Bukan';

  return {
    id: `d-${Date.now()}-${Math.random()}`,
    type: 'diagram',
    question: `Aturan X: Semua bangun Hitam.\nAturan Y: Semua bangun Putih.\n\nGambar: ${shape} berwarna ${color}. Masuk kategori mana?`,
    options: ['Kategori X', 'Kategori Y', 'Keduanya Bukan'],
    answer: answer === 'X' ? 'Kategori X' : answer === 'Y' ? 'Kategori Y' : 'Keduanya Bukan'
  };
};
