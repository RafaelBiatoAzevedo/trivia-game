import test from 'node:test';
import assert from 'node:assert/strict';
import { bank, defaults, localQuestions, points, shuffle } from './game';
test('pontuação preserva regras de dificuldade e tempo', () => {assert.equal(points('easy',30),40);assert.equal(points('medium',15),40);assert.equal(points('hard',30),100);assert.equal(points('hard',-1),10);});
test('filtros locais respeitam categoria, dificuldade e formato', () => {const list=localQuestions({...defaults,category:'17',difficulty:'medium',type:'multiple',number:50});assert.ok(list.length>0);assert.ok(list.every(q=>q.categoryId==='17' && q.difficulty==='medium' && q.type==='multiple'));assert.equal(new Set(list.map(q=>q.question)).size,list.length);});
test('todas as perguntas possuem exatamente uma resposta correta', () => {for(const q of bank){assert.equal(q.answers.filter(a=>a===q.correct).length,1);assert.equal(new Set(q.answers).size,q.answers.length);}});
test('embaralhar preserva dados originais', () => {const input=[1,2,3,4];assert.deepEqual(shuffle(input).sort(),input);assert.deepEqual(input,[1,2,3,4]);});
test('combinação indisponível dá erro claro em vez de ignorar filtros', () => {assert.throws(()=>localQuestions({...defaults,category:'999'}),/Não há perguntas/);});

test('rodada mista não repete o mesmo fato em formatos diferentes', () => { const list=localQuestions({...defaults,number:50}); const facts=list.map(q=>q.question.split(' Resposta:')[0].replace(/\?$/, '')); assert.equal(new Set(facts).size,list.length); assert.equal(list.length,30); });
