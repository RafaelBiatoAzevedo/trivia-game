export type Difficulty = '' | 'easy' | 'medium' | 'hard';
export type Settings = { number: number; category: string; difficulty: Difficulty; type: '' | 'multiple' | 'boolean'; source: 'local' | 'online' };
export type Question = { question: string; category: string; difficulty: Exclude<Difficulty, ''>; correct: string; answers: string[]; type: 'multiple' | 'boolean'; categoryId: string };
export type Player = { name: string; email: string };
export type RecordEntry = Player & { id: string; score: number; correct: number; total: number; date: string; gravatarEmail?: string };
export const defaults: Settings = { number: 5, category: '', difficulty: '', type: '', source: 'local' };
export const categories = [
  { id: '', name: 'Surpreenda-me', description: 'Um pouco de tudo', icon: 'shuffle', color: 'green' },
  { id: '9', name: 'Conhecimentos gerais', description: 'O mundo é sua pista', icon: 'globe', color: 'blue' },
  { id: '17', name: 'Ciência & natureza', description: 'Explore o extraordinário', icon: 'atom', color: 'purple' },
  { id: '11', name: 'Cinema & séries', description: 'Luzes, câmera, resposta', icon: 'film', color: 'orange' },
  { id: '15', name: 'Videogames', description: 'Sua próxima conquista', icon: 'gamepad', color: 'pink' },
  { id: '23', name: 'História', description: 'Uma viagem no tempo', icon: 'landmark', color: 'yellow' },
  { id: '22', name: 'Geografia', description: 'Sem sair do lugar', icon: 'map', color: 'teal' },
];
export const onlineCategories = [
 ...categories,
 {id:'10',name:'Livros'}, {id:'12',name:'Música'}, {id:'13',name:'Musicais e teatro'}, {id:'14',name:'Televisão'}, {id:'16',name:'Jogos de tabuleiro'}, {id:'18',name:'Computação'}, {id:'19',name:'Matemática'}, {id:'20',name:'Mitologia'}, {id:'21',name:'Esportes'}, {id:'24',name:'Política'}, {id:'25',name:'Arte'}, {id:'26',name:'Celebridades'}, {id:'27',name:'Animais'}, {id:'28',name:'Veículos'}, {id:'29',name:'Quadrinhos'}, {id:'30',name:'Gadgets'}, {id:'31',name:'Anime e mangá'}, {id:'32',name:'Animação'},
];
const rows: [string,string,string,string[],Question['difficulty']][] = [
 ['9','Qual é o maior oceano do planeta?','Pacífico',['Atlântico','Índico','Ártico'],'easy'],
 ['9','Qual instrumento mede a pressão atmosférica?','Barômetro',['Termômetro','Anemômetro','Higrômetro'],'medium'],
 ['9','Quantos lados tem um hexágono?','6',['5','7','8'],'easy'],
 ['9','Qual é a moeda oficial do Japão?','Iene',['Yuan','Won','Rúpia'],'easy'],
 ['9','Quem escreveu “Dom Casmurro”?','Machado de Assis',['José de Alencar','Clarice Lispector','Jorge Amado'],'medium'],
 ['17','Qual planeta é conhecido como planeta vermelho?','Marte',['Vênus','Júpiter','Saturno'],'easy'],
 ['17','Qual é o símbolo químico do ouro?','Au',['Ag','Fe','Cu'],'medium'],
 ['17','Qual organela realiza a fotossíntese?','Cloroplasto',['Mitocôndria','Ribossomo','Lisossomo'],'medium'],
 ['17','Qual partícula tem carga elétrica negativa?','Elétron',['Próton','Nêutron','Fóton'],'easy'],
 ['17','Qual é a unidade de resistência elétrica?','Ohm',['Watt','Volt','Ampère'],'hard'],
 ['11','Quem dirigiu o filme “Jurassic Park” de 1993?','Steven Spielberg',['James Cameron','George Lucas','Tim Burton'],'medium'],
 ['11','Em qual escola Harry Potter estuda?','Hogwarts',['Nárnia','Nevermore','Xavier'],'easy'],
 ['11','Qual filme ganhou o Oscar de melhor filme em 2020?','Parasita',['1917','Coringa','Era Uma Vez em Hollywood'],'hard'],
 ['11','Qual é o nome do cowboy de Toy Story?','Woody',['Buzz','Andy','Rex'],'easy'],
 ['11','Qual é a cidade do Batman?','Gotham',['Metropolis','Star City','Central City'],'easy'],
 ['15','Qual empresa criou o personagem Mario?','Nintendo',['Sega','Sony','Atari'],'easy'],
 ['15','Qual é o nome do protagonista de The Legend of Zelda?','Link',['Zelda','Ganon','Epona'],'easy'],
 ['15','Em Minecraft, qual material é usado para um portal do Nether?','Obsidiana',['Diamante','Granito','Quartzo'],'medium'],
 ['15','Qual estúdio desenvolveu Hollow Knight?','Team Cherry',['Supergiant Games','FromSoftware','ConcernedApe'],'hard'],
 ['15','Qual jogo se passa na cidade submersa de Rapture?','BioShock',['Fallout','Portal','Half-Life'],'medium'],
 ['23','Em que ano o Brasil declarou sua independência?','1822',['1889','1808','1500'],'easy'],
 ['23','Qual civilização construiu Machu Picchu?','Inca',['Maia','Asteca','Olmeca'],'medium'],
 ['23','Em que ano caiu o Muro de Berlim?','1989',['1991','1985','1979'],'medium'],
 ['23','Quem foi o primeiro presidente do Brasil?','Deodoro da Fonseca',['Getúlio Vargas','Floriano Peixoto','Prudente de Morais'],'medium'],
 ['23','Em que ano começou a Revolução Francesa?','1789',['1776','1815','1848'],'hard'],
 ['22','Qual é a capital da Austrália?','Canberra',['Sydney','Melbourne','Perth'],'medium'],
 ['22','Qual país tem a maior população da América do Sul?','Brasil',['Argentina','Colômbia','Peru'],'easy'],
 ['22','Em qual continente fica o deserto do Saara?','África',['Ásia','Oceania','Europa'],'easy'],
 ['22','Qual país é atravessado pela Linha do Equador?','Equador',['Chile','Uruguai','Paraguai'],'easy'],
 ['22','Qual é a capital do Canadá?','Ottawa',['Toronto','Vancouver','Montreal'],'hard'],
];
export function shuffle<T>(items: T[]): T[] { const result = [...items]; for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i],result[j]] = [result[j],result[i]]; } return result; }
export const bank: Question[] = rows.flatMap(([id,question,correct,wrong,difficulty]) => {
 const category = categories.find(c => c.id === id)!.name;
 return [{ categoryId: id, category, question, correct, answers: [correct,...wrong], difficulty, type: 'multiple' as const }, { categoryId: id, category, question: `${question.replace(/\?$/, '')} Resposta: ${correct}.`, correct: 'Verdadeiro', answers: ['Verdadeiro','Falso'], difficulty, type: 'boolean' as const }, { categoryId: id, category, question: `${question.replace(/\?$/, '')} Resposta: ${wrong[0]}.`, correct: 'Falso', answers: ['Verdadeiro','Falso'], difficulty, type: 'boolean' as const }];
});
export function localQuestions(settings: Settings): Question[] {
 const pool = bank.filter(q => (!settings.category || q.categoryId === settings.category) && (!settings.difficulty || q.difficulty === settings.difficulty) && (!settings.type || q.type === settings.type));
 if (!pool.length) throw new Error('Não há perguntas locais nessa combinação. Tente outra dificuldade ou categoria.');
 const unique = new Map<string, Question>();
 for (const q of shuffle(pool)) { const key = q.question.split(' Resposta:')[0].replace(/\?$/, ''); if (!unique.has(key)) unique.set(key,q); }
 return shuffle([...unique.values()]).slice(0, settings.number).map(q => ({...q, answers: q.type === 'boolean' ? q.answers : shuffle(q.answers)}));
}
export function points(difficulty: Question['difficulty'], seconds: number) { return 10 + Math.max(0, seconds) * ({ easy: 1, medium: 2, hard: 3 }[difficulty]); }
export function read<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
export function write(key: string, value: unknown): boolean { try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } }
const decode = (text: string) => { const doc = new DOMParser().parseFromString(text, 'text/html'); return doc.documentElement.textContent || ''; };
export async function loadQuestions(settings: Settings): Promise<Question[]> {
 if (settings.source === 'local') return localQuestions(settings);
 const params = new URLSearchParams({ amount: String(settings.number) });
 for (const key of ['category','difficulty','type'] as const) if (settings[key]) params.set(key,settings[key]);
 const response = await fetch(`https://opentdb.com/api.php?${params}`, { signal: AbortSignal.timeout(12000) });
 if (!response.ok) throw new Error('A API está indisponível. Tente o banco local nas configurações.');
 const data = await response.json();
 if (data.response_code !== 0 || !Array.isArray(data.results) || !data.results.length) throw new Error('A API não retornou perguntas. Aguarde alguns segundos ou altere os filtros.');
 return data.results.map((q: {question: string; category: string; difficulty: Question['difficulty']; correct_answer: string; incorrect_answers: string[]; type: Question['type']}) => ({ question: decode(q.question), category: decode(q.category), difficulty: q.difficulty, correct: decode(q.correct_answer), answers: shuffle([q.correct_answer,...q.incorrect_answers].map(decode)), type: q.type, categoryId: settings.category }));
}
