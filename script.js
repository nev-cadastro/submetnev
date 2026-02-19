// ==============================================
// SISTEMA DE NORMAS NEV/USP - VERSÃO COMPLETA E ESTÁVEL
// ==============================================
// ✅ Cards enxutos na página inicial
// ✅ Guias de redação em view separada
// ✅ Todas as funções de detalhe mantidas
// ✅ Fallback robusto
// ==============================================

window.state = {
    revistas: [],
    normasGerais: {},
    filtroQualis: 'Todos',
    searchTerm: '',
    currentView: 'main',       // 'main', 'detail', 'general', 'guide'
    currentRevista: null
};

window.CONFIG = {
    JSON_PATH: 'data.json',
    CACHE_KEY: 'nev_normas_cache_v2',
    CACHE_DURATION: 60 * 60 * 1000 // 1 hora
};

// ==============================================
// BIBLIOTECA DE GUIAS POR TIPO DE TEXTO
// ==============================================
const GUIAS = {
    resenha: {
        icone: "📖",
        cor: "blue",
        titulo: "📋 Roteiro para Elaboração de Resenha Crítica",
        etapas: [
            {
                icone: "📌",
                titulo: "1. Informações da obra",
                itens: [
                    "Autor(es) completo(s)",
                    "Título completo e subtítulo",
                    "Editora, cidade, ano de publicação",
                    "Número de páginas",
                    "ISBN (se disponível)"
                ]
            },
            {
                icone: "📖",
                titulo: "2. Síntese do conteúdo",
                itens: [
                    "Tese central do autor",
                    "Estrutura/organização dos capítulos",
                    "Metodologia utilizada (se aplicável)",
                    "Principais argumentos e evidências"
                ]
            },
            {
                icone: "⚖️",
                titulo: "3. Abordagem crítica",
                itens: [
                    "✓ Pontos fortes: contribuições, originalidade, rigor",
                    "⚠️ Limitações: problemas, lacunas, questões controversas",
                    "🎯 Adequação ao escopo da área",
                    "💡 Contribuição para o debate acadêmico"
                ]
            },
            {
                icone: "🔗",
                titulo: "4. Relações intertextuais",
                itens: [
                    "Diálogo com outros autores da área",
                    "Posição no campo disciplinar",
                    "Tradição teórica em que se insere",
                    "Obras correlatas (mínimo 2 referências)"
                ]
            },
            {
                icone: "🎯",
                titulo: "5. Fio condutor",
                itens: [
                    "Escolha do ângulo de análise (NÃO repita o índice do livro)",
                    "Tese da resenha: qual seu argumento sobre a obra?",
                    "Como este fio conduz toda a apresentação"
                ]
            }
        ],
        dica: "Uma boa resenha NÃO é um resumo. É uma análise crítica guiada por um fio condutor próprio."
    },

    artigo: {
        icone: "📄",
        cor: "purple",
        titulo: "📋 Estrutura do Artigo Científico",
        descricao: "Baseado nas normas ABNT (NBR 6022, 6023, 10520) e diretrizes SciELO",
        etapas: [
            {
                icone: "🏷️",
                titulo: "Elementos pré-textuais",
                itens: [
                    "Título (português e inglês) - claro, conciso, representativo",
                    "Resumo (100-250 palavras) - problema, objetivo, método, resultados, conclusão",
                    "Palavras-chave (3-5) - termos que representam o conteúdo",
                    "Abstract - versão em inglês do resumo",
                    "Keywords - versão em inglês das palavras-chave"
                ]
            },
            {
                icone: "🎯",
                titulo: "Introdução",
                itens: [
                    "Delimitação do tema/problema de pesquisa",
                    "Pergunta de pesquisa / hipótese",
                    "Justificativa e relevância",
                    "Objetivos (geral e específicos)",
                    "Breve estrutura do artigo"
                ]
            },
            {
                icone: "📚",
                titulo: "Referencial teórico",
                itens: [
                    "Estado da arte: o que já foi produzido sobre o tema",
                    "Categorias e conceitos fundamentais",
                    "Diálogo crítico com a literatura",
                    "Posicionamento teórico do autor"
                ]
            },
            {
                icone: "🔬",
                titulo: "Metodologia",
                itens: [
                    "Abordagem (quantitativa/qualitativa/mista)",
                    "Procedimentos de coleta de dados",
                    "Técnicas de análise",
                    "Aspectos éticos (CAAE para pesquisas com seres humanos)",
                    "Limitações do método"
                ]
            },
            {
                icone: "📊",
                titulo: "Resultados e Discussão",
                itens: [
                    "Apresentação clara e objetiva dos achados",
                    "Tabelas, gráficos e figuras com fontes e títulos",
                    "Diálogo com a literatura (confirma, contradiz, inova?)",
                    "Interpretação dos resultados à luz do referencial teórico",
                    "Implicações teóricas e práticas"
                ]
            },
            {
                icone: "🎯",
                titulo: "Considerações finais",
                itens: [
                    "Síntese da contribuição do estudo",
                    "Retomada dos objetivos e respostas à pergunta",
                    "Limitações da pesquisa",
                    "Agenda para pesquisas futuras"
                ]
            }
        ],
        dica: "A coerência entre problema, método e conclusão é o principal critério de avaliação."
    },

    ensaio: {
        icone: "📝",
        cor: "amber",
        titulo: "📋 Roteiro para Ensaio Teórico",
        descricao: "Ênfase em elaboração conceitual, originalidade e reflexão crítica",
        etapas: [
            {
                icone: "🎯",
                titulo: "Tese central",
                itens: [
                    "Proposição original (não apenas revisão)",
                    "Problema conceitual a ser enfrentado",
                    "Contribuição esperada para o campo"
                ]
            },
            {
                icone: "📚",
                titulo: "Diálogo com a tradição",
                itens: [
                    "Revisão seletiva (não exaustiva) da literatura",
                    "Identificação de lacunas ou aporias",
                    "Posicionamento crítico frente aos autores",
                    "Justificativa da originalidade"
                ]
            },
            {
                icone: "💭",
                titulo: "Desenvolvimento argumentativo",
                itens: [
                    "Encadeamento lógico e progressivo",
                    "Contra-argumentos e objeções antecipadas",
                    "Evidências conceituais e empíricas",
                    "Consistência interna"
                ]
            },
            {
                icone: "✨",
                titulo: "Originalidade",
                itens: [
                    "Proposição de novo conceito/categoria analítica",
                    "Releitura inovadora de tradição consolidada",
                    "Síntese criativa entre diferentes correntes",
                    "Aplicação original de teoria a novo objeto"
                ]
            }
        ],
        dica: "Ensaios são julgados pela originalidade, consistência argumentativa e contribuição conceitual."
    },

    tese_dissertacao: {
        icone: "🎓",
        cor: "emerald",
        titulo: "📋 Estrutura de Teses e Dissertações",
        descricao: "Baseado na ABNT NBR 14724 e práticas dos PPGs",
        etapas: [
            {
                icone: "🏷️",
                titulo: "Elementos pré-textuais",
                itens: [
                    "Capa (com nome completo, título, ano)",
                    "Folha de rosto",
                    "Ficha catalográfica",
                    "Folha de aprovação",
                    "Dedicatória (opcional)",
                    "Agradecimentos",
                    "Epígrafe (opcional)",
                    "Resumo em português",
                    "Resumo em inglês (abstract)",
                    "Lista de ilustrações, tabelas, abreviaturas (se houver)",
                    "Sumário"
                ]
            },
            {
                icone: "📝",
                titulo: "Introdução",
                itens: [
                    "Tema e delimitação",
                    "Problema de pesquisa",
                    "Hipóteses ou pressupostos",
                    "Objetivos",
                    "Justificativa",
                    "Estrutura do trabalho"
                ]
            },
            {
                icone: "📚",
                titulo: "Referencial teórico",
                itens: [
                    "Revisão sistemática ou integrativa da literatura",
                    "Definição de categorias analíticas",
                    "Modelo de análise",
                    "Posicionamento epistemológico"
                ]
            },
            {
                icone: "🔬",
                titulo: "Metodologia",
                itens: [
                    "Tipo de pesquisa",
                    "Universo e amostra",
                    "Instrumentos de coleta",
                    "Procedimentos de análise",
                    "Aspectos éticos (CAAE)"
                ]
            },
            {
                icone: "📊",
                titulo: "Resultados / Capítulos",
                itens: [
                    "Organização por eixos temáticos",
                    "Apresentação dos achados",
                    "Análise e interpretação",
                    "Diálogo com a teoria"
                ]
            },
            {
                icone: "🎯",
                titulo: "Conclusão / Considerações finais",
                itens: [
                    "Síntese das respostas aos objetivos",
                    "Contribuições originais",
                    "Limitações",
                    "Estudos futuros"
                ]
            },
            {
                icone: "📋",
                titulo: "Elementos pós-textuais",
                itens: [
                    "Referências (obrigatório)",
                    "Apêndices (opcional)",
                    "Anexos (opcional)"
                ]
            }
        ],
        dica: "Consulte o regimento do seu Programa de Pós-Graduação, pois há variações institucionais."
    },

    relatorio_tecnico: {
        icone: "📋",
        cor: "slate",
        titulo: "📋 Roteiro para Relatório Técnico-Científico",
        descricao: "Estrutura para avaliação de políticas, programas e intervenções",
        etapas: [
            {
                icone: "🎯",
                titulo: "Contexto e demanda",
                itens: [
                    "Instituição solicitante",
                    "Problema/desafio enfrentado",
                    "Objetivo da consultoria/avaliação",
                    "Escopo do trabalho"
                ]
            },
            {
                icone: "🔬",
                titulo: "Metodologia",
                itens: [
                    "Abordagem e métodos",
                    "Fontes de dados",
                    "Instrumentos",
                    "Período de coleta"
                ]
            },
            {
                icone: "📊",
                titulo: "Diagnóstico",
                itens: [
                    "Caracterização do problema",
                    "Dados e evidências",
                    "Análise situacional",
                    "Comparativos (quando aplicável)"
                ]
            },
            {
                icone: "💡",
                titulo: "Recomendações",
                itens: [
                    "Propostas baseadas em evidências",
                    "Viabilidade",
                    "Etapas de implementação",
                    "Indicadores de monitoramento"
                ]
            }
        ],
        dica: "Relatórios técnicos devem equilibrar rigor acadêmico e linguagem acessível ao gestor público."
    }
};

// ==============================================
// FUNÇÕES AUXILIARES
// ==============================================

function showLoading(show) {
    const grid = document.getElementById('revistas-grid');
    if (!grid) return;
    if (show) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-700 border-t-transparent mb-4"></div>
                <p class="text-slate-600 font-medium">Carregando revistas...</p>
            </div>
        `;
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = '';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-exclamation-circle';
    else if (type === 'warning') icon = 'fa-exclamation-triangle';
    else icon = 'fa-info-circle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==============================================
// FILTROS QUALIS
// ==============================================

function renderQualisFilters() {
    const container = document.getElementById('qualis-filters');
    if (!container) return;

    const qualisValues = [];
    for (let i = 0; i < window.state.revistas.length; i++) {
        const q = window.state.revistas[i].qualis;
        if (q && qualisValues.indexOf(q) === -1) {
            qualisValues.push(q);
        }
    }
    
    qualisValues.sort((a, b) => {
        const aNum = parseInt(a.substring(1)) || 0;
        const bNum = parseInt(b.substring(1)) || 0;
        if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
        return aNum - bNum;
    });

    let html = `<button class="filter-btn active px-5 py-2 rounded-full text-sm font-bold transition-all bg-blue-700 text-white shadow-sm" data-type="qualis" data-value="Todos">Todos</button>`;

    for (let j = 0; j < qualisValues.length; j++) {
        const qualis = qualisValues[j];
        html += `<button class="filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all bg-white text-slate-700 border border-slate-300 hover:border-blue-400 hover:bg-blue-50" data-type="qualis" data-value="${qualis}">${qualis}</button>`;
    }

    container.innerHTML = html;

    const buttons = container.querySelectorAll('[data-type="qualis"]');
    for (let k = 0; k < buttons.length; k++) {
        buttons[k].addEventListener('click', function(e) {
            const btn = e.currentTarget;
            for (let l = 0; l < buttons.length; l++) {
                buttons[l].classList.remove('active', 'bg-blue-700', 'text-white');
                buttons[l].classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-300');
            }
            btn.classList.remove('bg-white', 'border', 'border-slate-300');
            btn.classList.add('active', 'bg-blue-700', 'text-white');

            window.state.filtroQualis = btn.dataset.value;
            renderMainView();
            updateResultsCount();
        });
    }
}

// ==============================================
// FUNÇÕES DE RENDERIZAÇÃO PRINCIPAL
// ==============================================

function filterRevistas() {
    const resultado = [];
    for (let i = 0; i < window.state.revistas.length; i++) {
        const revista = window.state.revistas[i];
        if (window.state.filtroQualis !== 'Todos' && revista.qualis !== window.state.filtroQualis) continue;
        
        if (window.state.searchTerm) {
            const text = `${revista.nome} ${revista.instituicao || ''} ${revista.foco || ''} ${revista.descricao || ''}`.toLowerCase();
            if (text.indexOf(window.state.searchTerm.toLowerCase()) === -1) continue;
        }
        resultado.push(revista);
    }
    return resultado;
}

function updateResultsCount() {
    const el = document.getElementById('results-count');
    if (!el) return;
    const filtered = filterRevistas();
    const count = filtered.length;
    const total = window.state.revistas.length;
    el.innerHTML = `<span class="font-bold text-blue-700">${count}</span> revistas encontradas <span class="text-slate-400">(de ${total})</span>`;
}

function renderMainView() {
    const grid = document.getElementById('revistas-grid');
    if (!grid) return;

    const filtered = filterRevistas();

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16 bg-slate-50 rounded-2xl">
                <i class="fas fa-search text-5xl text-slate-400 mb-4"></i>
                <h3 class="text-2xl font-bold text-slate-700 mb-2">Nenhuma revista encontrada</h3>
                <p class="text-slate-500">Tente ajustar os filtros</p>
            </div>
        `;
        return;
    }

    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        const revista = filtered[i];
        
        let qualisClass = '';
        if (revista.qualis === 'A1') qualisClass = 'bg-emerald-100 text-emerald-800';
        else if (revista.qualis === 'A2') qualisClass = 'bg-sky-100 text-sky-800';
        else qualisClass = 'bg-amber-100 text-amber-800';

        const inst = revista.instituicao || '';
        const instAbrev = inst.split(' ').slice(0, 2).join(' ') || '';

        html += `
            <div class="bg-white rounded-xl card-shadow hover:shadow-lg border border-slate-100 p-6 transition-all">
                <div class="flex justify-between items-start mb-3">
                    <span class="px-3 py-1 ${qualisClass} rounded-full text-xs font-bold">
                        Qualis ${revista.qualis || 'N/I'}
                    </span>
                    <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        <i class="fas fa-university mr-1"></i>${instAbrev}
                    </span>
                </div>
                
                <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">${revista.nome}</h3>
                <p class="text-slate-600 text-sm mb-4 line-clamp-2">${revista.descricao || ''}</p>
                
                <button onclick="showRevistaDetail(${revista.id})" 
                    class="w-full bg-slate-50 hover:bg-blue-700 hover:text-white py-2.5 px-4 rounded-lg border border-slate-200 transition-all flex items-center justify-center gap-2">
                    <i class="fas fa-file-alt"></i>
                    Ver Diretrizes
                </button>
            </div>
        `;
    }
    grid.innerHTML = html;
}

// ==============================================
// VIEW DE DETALHE DA REVISTA (COMPLETA)
// ==============================================

window.showRevistaDetail = function(id) {
    let revista = null;
    for (let i = 0; i < window.state.revistas.length; i++) {
        if (window.state.revistas[i].id === id) {
            revista = window.state.revistas[i];
            break;
        }
    }
    if (!revista) return;

    window.state.currentView = 'detail';
    window.state.currentRevista = revista;

    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');

    let tiposTextoHtml = '';
    if (revista.tipos_texto && revista.tipos_texto.length > 0) {
        for (let j = 0; j < revista.tipos_texto.length; j++) {
            const tipo = revista.tipos_texto[j];
            const tipoLower = tipo.tipo.toLowerCase();
            let guiaId = null;
            if (tipoLower.includes('resenha')) guiaId = 'resenha';
            else if (tipoLower.includes('artigo') || tipoLower.includes('dossiê') || tipoLower.includes('dossie')) guiaId = 'artigo';
            else if (tipoLower.includes('ensaio')) guiaId = 'ensaio';
            
            tiposTextoHtml += `
                <div class="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
                    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 class="font-bold text-blue-800 text-lg">${tipo.tipo}</h4>
                                ${tipo.template ? '<span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"><i class="fas fa-download mr-1"></i>Template</span>' : ''}
                                ${guiaId ? '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"><i class="fas fa-compass mr-1"></i>Guia</span>' : ''}
                            </div>
                            <p class="text-sm text-slate-500 font-medium">${tipo.extensao || ''}</p>
                            <p class="text-sm text-slate-600 mt-2">${tipo.detalhes || ''}</p>
                            
                            ${guiaId ? renderizarGuia(guiaId) : ''}
                        </div>
                        
                        ${tipo.template ? `
                            <button onclick="window.downloadTemplate('${tipo.template}')" 
                                class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 self-start">
                                <i class="fas fa-download"></i>
                                <span>Template</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    }

    let secoesHtml = '';
    if (revista.secoes && revista.secoes.length > 0) {
        let secoesItems = '';
        for (let s = 0; s < revista.secoes.length; s++) {
            secoesItems += `<span class="bg-white px-3 py-1.5 rounded-full text-xs border border-purple-200 text-purple-800">${revista.secoes[s]}</span>`;
        }
        secoesHtml = `
            <div class="mt-6 bg-purple-50 rounded-xl p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <i class="fas fa-layer-group text-purple-700"></i>
                    Seções da Revista
                </h3>
                <div class="flex flex-wrap gap-2">
                    ${secoesItems}
                </div>
            </div>
        `;
    }

    let checklistHtml = '';
    if (revista.checklist && revista.checklist.length > 0) {
        let checklistItems = '';
        for (let c = 0; c < revista.checklist.length; c++) {
            checklistItems += `
                <li class="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-100">
                    <i class="fas fa-check-circle text-green-600 mt-1 shrink-0"></i>
                    <span class="text-sm text-slate-700">${revista.checklist[c]}</span>
                </li>
            `;
        }
        checklistHtml = `
            <div class="mt-6 bg-slate-50 rounded-xl p-6">
                <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-check-circle text-green-700"></i>
                    Checklist de Submissão
                </h3>
                <ul class="grid md:grid-cols-2 gap-3">
                    ${checklistItems}
                </ul>
            </div>
        `;
    }

    let limitesHtml = '';
    if (revista.limites) {
        let limitesItems = '';
        for (let key in revista.limites) {
            if (revista.limites.hasOwnProperty(key)) {
                limitesItems += `
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${key.replace(/_/g, ' ')}</span>
                        <p class="font-semibold text-slate-800 mt-1">${revista.limites[key]}</p>
                    </div>
                `;
            }
        }
        limitesHtml = `
            <div class="mt-6 bg-blue-50 rounded-xl p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <i class="fas fa-ruler text-blue-700"></i>
                    Limites e Requisitos
                </h3>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${limitesItems}
                </div>
            </div>
        `;
    }

    document.getElementById('revista-detail-content').innerHTML = `
        <div class="bg-white rounded-xl card-shadow p-8">
            <!-- Header -->
            <div class="flex justify-between items-start mb-6">
                <div>
                    <div class="flex flex-wrap gap-2 mb-2">
                        <span class="px-3 py-1 ${revista.qualis === 'A1' ? 'bg-emerald-100 text-emerald-800' : revista.qualis === 'A2' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'} rounded-full text-xs font-bold">
                            Qualis ${revista.qualis}
                        </span>
                        ${revista.issn ? `<span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs"><i class="fas fa-barcode mr-1"></i>ISSN ${revista.issn}</span>` : ''}
                        ${revista.preprint === 'NÃO PERMITE' ? 
                            `<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs"><i class="fas fa-ban mr-1"></i>Não permite preprint</span>` : ''}
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900 mb-2">${revista.nome}</h2>
                    <p class="text-slate-600 text-lg">${revista.descricao || ''}</p>
                </div>
                <button onclick="hideRevistaDetail()" class="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-all">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <!-- Links e Info -->
            <div class="flex flex-wrap gap-3 mb-6">
                <a href="${revista.links?.site || '#'}" target="_blank" 
                    class="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                    <i class="fas fa-globe"></i> Site Oficial
                </a>
                <a href="${revista.links?.submissao || '#'}" target="_blank"
                    class="bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                    <i class="fas fa-upload"></i> Submissão
                </a>
                ${revista.links?.diretrizes ? `
                    <a href="${revista.links.diretrizes}" target="_blank"
                        class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all">
                        <i class="fas fa-file-alt"></i> Diretrizes
                    </a>
                ` : ''}
                <button onclick="hideRevistaDetail()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-all ml-auto">
                    <i class="fas fa-arrow-left mr-2"></i> Voltar
                </button>
            </div>
            
            <!-- Info adicional -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 bg-slate-50 p-4 rounded-xl">
                <div>
                    <span class="text-xs text-slate-500 uppercase">Periodicidade</span>
                    <p class="font-medium text-slate-800 text-sm mt-1">${revista.periodicidade || 'N/I'}</p>
                </div>
                <div>
                    <span class="text-xs text-slate-500 uppercase">Avaliação</span>
                    <p class="font-medium text-slate-800 text-sm mt-1">${revista.avaliacao || 'N/I'}</p>
                </div>
                <div>
                    <span class="text-xs text-slate-500 uppercase">Taxas</span>
                    <p class="font-medium text-green-700 text-sm mt-1">${revista.taxa || 'Gratuita'}</p>
                </div>
                <div>
                    <span class="text-xs text-slate-500 uppercase">Licença</span>
                    <p class="font-medium text-slate-800 text-sm mt-1">${revista.licenca || 'CC BY'}</p>
                </div>
            </div>
            
            <!-- Tipos de Texto com BOTÕES E GUIAS -->
            <div class="bg-slate-50 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <i class="fas fa-file-alt text-blue-700"></i>
                        Tipos de Texto
                    </h3>
                    <span class="text-xs text-slate-500">
                        ${revista.tipos_texto?.length || 0} formatos disponíveis
                    </span>
                </div>
                
                <div class="space-y-6">
                    ${tiposTextoHtml}
                </div>
            </div>
            
            ${secoesHtml}
            ${checklistHtml}
            ${limitesHtml}
        </div>
    `;
};

window.hideRevistaDetail = function() {
    document.getElementById('detail-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// DOWNLOAD DE TEMPLATE
// ==============================================
window.downloadTemplate = function(templatePath) {
    if (!templatePath) {
        showToast('Template não disponível para este tipo de texto.', 'warning');
        return;
    }

    try {
        const link = document.createElement('a');
        link.href = templatePath;
        link.download = templatePath.split('/').pop();
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Download iniciado!', 'success');
    } catch (error) {
        window.open(templatePath, '_blank');
        showToast('Tentando abrir o template em nova aba...', 'info');
    }
};

// ==============================================
// RENDERIZAÇÃO DA VIEW DE GUIAS
// ==============================================

function renderizarGuiaCompleta(guia, cor = 'blue') {
    const coresBorder = {
        purple: 'border-purple-200',
        amber: 'border-amber-200',
        blue: 'border-blue-200',
        emerald: 'border-emerald-200',
        slate: 'border-slate-200'
    };
    const borderClass = coresBorder[cor] || 'border-blue-100';

    let html = '<div>';
    html += '<div class="grid md:grid-cols-2 gap-3">';
    for (let i = 0; i < guia.etapas.length; i++) {
        const etapa = guia.etapas[i];
        html += `<div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${borderClass}">`;
        html += `<div class="flex items-center gap-2 mb-2">`;
        html += `<span class="text-lg">${etapa.icone}</span>`;
        html += `<h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>`;
        html += `</div>`;
        html += `<ul class="space-y-1">`;
        for (let j = 0; j < etapa.itens.length; j++) {
            const item = etapa.itens[j];
            html += `<li class="flex items-start gap-1.5 text-xs">`;
            html += `<i class="fas fa-circle text-${cor}-400 text-[6px] mt-1.5"></i>`;
            html += `<span class="text-slate-600">${item}</span>`;
            html += `</li>`;
        }
        html += `</ul>`;
        html += `</div>`;
    }
    html += '</div>';

    if (guia.dica) {
        html += `<div class="mt-3 bg-white/60 p-3 rounded-lg border ${borderClass} flex items-start gap-2">`;
        html += `<i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>`;
        html += `<span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>`;
        html += `</div>`;
    }
    html += '</div>';
    return html;
}

function toggleRoteiroUniversal(id) {
    const el = document.getElementById(`roteiro-${id}`);
    const icone = document.getElementById(`icone-${id}`);
    if (el && icone) {
        el.classList.toggle('hidden');
        icone.classList.toggle('rotate-180');
    }
}
window.toggleRoteiroUniversal = toggleRoteiroUniversal;

function renderGuideView() {
    const container = document.getElementById('guide-content');
    if (!container) return;

    // Estrutura geral da pesquisa
    const estruturaHTML = `
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-slate-700">
            <div class="flex items-start gap-4 mb-6">
                <div class="bg-blue-500 p-3 rounded-xl shadow-lg">
                    <i class="fas fa-sitemap text-2xl"></i>
                </div>
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold mb-2">Estrutura Geral da Pesquisa Acadêmica</h2>
                    <p class="text-slate-300 text-sm md:text-base">Os 5 pilares universais para qualquer trabalho científico em Ciências Sociais</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-5 gap-3">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-blue-300 text-2xl mb-2">🎯</div>
                    <h3 class="font-bold text-white mb-1">1. Problemática</h3>
                    <p class="text-xs text-slate-300">Tema, pergunta, objetivos, hipóteses</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-purple-300 text-2xl mb-2">📚</div>
                    <h3 class="font-bold text-white mb-1">2. Teoria</h3>
                    <p class="text-xs text-slate-300">Estado da arte, categorias, diálogo crítico</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-amber-300 text-2xl mb-2">🔬</div>
                    <h3 class="font-bold text-white mb-1">3. Método</h3>
                    <p class="text-xs text-slate-300">Abordagem, técnicas, ética, limites</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-emerald-300 text-2xl mb-2">📊</div>
                    <h3 class="font-bold text-white mb-1">4. Evidências</h3>
                    <p class="text-xs text-slate-300">Dados, análise, achados, interpretação</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-rose-300 text-2xl mb-2">✨</div>
                    <h3 class="font-bold text-white mb-1">5. Contribuição</h3>
                    <p class="text-xs text-slate-300">Originalidade, impacto, agenda futura</p>
                </div>
            </div>
            
            <div class="mt-4 text-xs text-slate-400 flex items-center gap-2 border-t border-white/10 pt-4">
                <i class="fas fa-info-circle"></i>
                <span>Baseado nas diretrizes ABNT, SciELO, ANPOCS e COPE. Válido para artigos, teses, dissertações, ensaios e relatórios.</span>
            </div>
        </div>
    `;

    // Roteiros por tipo de texto
    const tipos = [
        { id: 'artigo', icone: '📄', titulo: 'Artigo Científico', cor: 'purple', guia: GUIAS.artigo },
        { id: 'ensaio', icone: '📝', titulo: 'Ensaio Teórico', cor: 'amber', guia: GUIAS.ensaio },
        { id: 'resenha', icone: '📖', titulo: 'Resenha Crítica', cor: 'blue', guia: GUIAS.resenha },
        { id: 'tese', icone: '🎓', titulo: 'Tese/Dissertação', cor: 'emerald', guia: GUIAS.tese_dissertacao },
        { id: 'relatorio', icone: '📋', titulo: 'Relatório Técnico', cor: 'slate', guia: GUIAS.relatorio_tecnico }
    ];

    const coresBg = {
        purple: 'from-purple-50 to-white border-purple-200',
        amber: 'from-amber-50 to-white border-amber-200',
        blue: 'from-blue-50 to-white border-blue-200',
        emerald: 'from-emerald-50 to-white border-emerald-200',
        slate: 'from-slate-50 to-white border-slate-200'
    };

    let roteirosHTML = `
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-200">
            <div class="flex items-center gap-3 mb-6">
                <div class="bg-indigo-100 p-2.5 rounded-xl">
                    <i class="fas fa-compass text-indigo-700 text-xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-slate-900">Roteiros por Tipo de Texto</h2>
                <span class="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium ml-auto">
                    Guias universais (válidos para qualquer revista)
                </span>
            </div>
            
            <div class="space-y-4">
    `;

    for (let t = 0; t < tipos.length; t++) {
        const tipo = tipos[t];
        roteirosHTML += `
            <div class="border rounded-xl overflow-hidden bg-gradient-to-r ${coresBg[tipo.cor]} transition-all hover:shadow-md">
                <div class="p-5 cursor-pointer" onclick="toggleRoteiroUniversal('${tipo.id}')">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">${tipo.icone}</span>
                            <div>
                                <h3 class="font-bold text-slate-900">${tipo.titulo}</h3>
                                <p class="text-xs text-slate-500 mt-0.5">${tipo.guia.descricao || ''}</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-down text-slate-400 transition-transform" id="icone-${tipo.id}"></i>
                    </div>
                </div>
                <div id="roteiro-${tipo.id}" class="hidden border-t ${coresBg[tipo.cor].split(' ')[2]} p-5">
                    ${renderizarGuiaCompleta(tipo.guia, tipo.cor)}
                </div>
            </div>
        `;
    }

    roteirosHTML += '</div></div>';
    container.innerHTML = estruturaHTML + roteirosHTML;
}

// ==============================================
// FUNÇÃO AUXILIAR PARA RENDERIZAR GUIAS (USADA NO DETALHE)
// ==============================================
function renderizarGuia(tipo) {
    const guia = GUIAS[tipo];
    if (!guia) return '';

    const cores = {
        blue: 'border-blue-200 bg-blue-50',
        purple: 'border-purple-200 bg-purple-50',
        amber: 'border-amber-200 bg-amber-50',
        emerald: 'border-emerald-200 bg-emerald-50',
        slate: 'border-slate-200 bg-slate-50'
    };
    const corClass = cores[guia.cor] || 'border-blue-200 bg-blue-50';
    const borderClass = cores[guia.cor] ? cores[guia.cor].replace('bg', 'border') : 'border-blue-100';

    let html = `<div class="mt-4 ${corClass} rounded-xl p-5 border">`;
    html += `<div class="flex items-start gap-3 mb-4">`;
    html += `<span class="text-2xl">${guia.icone}</span>`;
    html += `<div><h5 class="font-bold text-slate-900">${guia.titulo}</h5>`;
    html += `<p class="text-xs text-slate-600 mt-0.5">${guia.descricao || ''}</p></div>`;
    html += `</div>`;

    html += `<div class="grid md:grid-cols-2 gap-3">`;
    for (let i = 0; i < guia.etapas.length; i++) {
        const etapa = guia.etapas[i];
        html += `<div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${borderClass}">`;
        html += `<div class="flex items-center gap-2 mb-2">`;
        html += `<span class="text-lg">${etapa.icone}</span>`;
        html += `<h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>`;
        html += `</div>`;
        html += `<ul class="space-y-1">`;
        for (let j = 0; j < etapa.itens.length; j++) {
            const item = etapa.itens[j];
            html += `<li class="flex items-start gap-1.5 text-xs">`;
            html += `<i class="fas fa-circle text-${guia.cor || 'blue'}-400 text-[6px] mt-1.5"></i>`;
            html += `<span class="text-slate-600">${item}</span>`;
            html += `</li>`;
        }
        html += `</ul>`;
        html += `</div>`;
    }
    html += `</div>`;

    if (guia.dica) {
        html += `<div class="mt-3 bg-white/60 p-3 rounded-lg border ${borderClass} flex items-start gap-2">`;
        html += `<i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>`;
        html += `<span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>`;
        html += `</div>`;
    }
    html += `</div>`;
    return html;
}
window.renderizarGuia = renderizarGuia;

// ==============================================
// NORMAS GERAIS
// ==============================================
window.showGeneralNorms = function() {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('general-norms-view').classList.remove('hidden');
    window.state.currentView = 'general';

    const n = window.state.normasGerais;
    
    let eticaHtml = '';
    if (n.etica && n.etica.length > 0) {
        for (let i = 0; i < n.etica.length; i++) {
            eticaHtml += `<li class="flex items-start gap-2"><i class="fas fa-check-circle text-green-600 mt-1"></i><span>${n.etica[i]}</span></li>`;
        }
    }

    let formatacaoHtml = '';
    if (n.formatacao) {
        for (let key in n.formatacao) {
            if (n.formatacao.hasOwnProperty(key)) {
                formatacaoHtml += `<li class="flex items-start gap-2"><i class="fas fa-arrow-right text-blue-600 mt-1"></i><span><strong>${key}:</strong> ${n.formatacao[key]}</span></li>`;
            }
        }
    }

    let checklistHtml = '';
    if (n.checklist_final && n.checklist_final.length > 0) {
        for (let j = 0; j < n.checklist_final.length; j++) {
            checklistHtml += `<div class="flex items-start gap-2"><i class="fas fa-check-square text-green-600 mt-1"></i><span>${n.checklist_final[j]}</span></div>`;
        }
    }

    document.getElementById('general-norms-content').innerHTML = `
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-shield-alt text-blue-700"></i>
                Ética e Integridade
            </h3>
            <ul class="space-y-2">
                ${eticaHtml}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-paint-brush text-purple-700"></i>
                Formatação
            </h3>
            <ul class="space-y-2">
                ${formatacaoHtml}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200 md:col-span-2">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-clipboard-list text-orange-700"></i>
                Checklist Final
            </h3>
            <div class="grid md:grid-cols-2 gap-3">
                ${checklistHtml}
            </div>
        </div>
    `;
};

window.hideGeneralNorms = function() {
    document.getElementById('general-norms-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// VIEW DE GUIAS
// ==============================================
window.showGuideView = function() {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('guide-view').classList.remove('hidden');
    window.state.currentView = 'guide';
    try {
        renderGuideView();
    } catch (e) {
        console.error('Erro ao renderizar guias:', e);
        showToast('Erro ao carregar guias.', 'error');
    }
};

window.hideGuideView = function() {
    document.getElementById('guide-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// CARREGAMENTO DE DADOS COM DETECÇÃO AUTOMÁTICA DE TEMPLATES
// ==============================================
function loadData() {
    showLoading(true);

    fetch(window.CONFIG.JSON_PATH + '?t=' + Date.now())
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            if (!data || !data.revistas || !data.revistas.length) {
                throw new Error('Nenhuma revista encontrada');
            }
            
            // Primeiro, carrega os dados do JSON
            window.state.revistas = data.revistas;
            window.state.normasGerais = data.normas_gerais || {};

            // Depois, tenta detectar templates automaticamente
            detectarTemplatesAutomaticamente();

            try {
                const cacheData = { timestamp: Date.now(), data: data };
                localStorage.setItem(window.CONFIG.CACHE_KEY, JSON.stringify(cacheData));
            } catch (e) {}

            renderQualisFilters();
            renderMainView();
            updateResultsCount();
            showLoading(false);
        })
        .catch(function(error) {
            console.error('Erro ao carregar dados:', error);
            showToast('Erro ao carregar dados. Usando dados de emergência.', 'error');
            loadEmergencyData();
            showLoading(false);
        });
}

// ==============================================
// FUNÇÃO PARA DETECTAR TEMPLATES AUTOMATICAMENTE
// ==============================================
function detectarTemplatesAutomaticamente() {
    // Lista de possíveis templates na pasta (simulada - no sistema real, isso dependeria de um endpoint)
    // Como não temos acesso ao sistema de arquivos via JavaScript puro,
    // vamos simular a detecção baseada em um padrão de nomenclatura
    
    // Mapeamento de nomes de revistas para prefixes usados nos templates
    const mapaPrefixes = {
        "Revista Brasileira de Ciências Sociais (RBCS)": "RBCS_ANPOCS",
        "DADOS – Revista de Ciências Sociais": "DADOS",
        "Tempo Social – Revista de Sociologia": "Tempo_Social",
        "Sociologias": "Sociologias",
        "Revista Brasileira de Sociologia (RBS)": "RBS",
        "Revista Brasileira de Segurança Pública (RBSP)": "RBSP",
        "Dilemas - Revista de Estudos de Conflito e Controle Social": "Dilemas",
        "Sociedade e Estado": "Sociedade_Estado"
    };

    // Mapeamento de tipos de texto para sufixos
    const mapaSufixos = {
        "artigo": "Artigo_Cientifico",
        "artigo científico": "Artigo_Cientifico",
        "artigo original": "Artigo_Cientifico",
        "ensaio": "Ensaio_Critico",
        "ensaio crítico": "Ensaio_Critico",
        "ensaio teórico": "Ensaio_Teorico",
        "resenha": "Resenha",
        "resenhas": "Resenha",
        "dossiê": "Dossie",
        "dossiês": "Dossie",
        "nota de pesquisa": "Nota_Pesquisa",
        "artigo técnico": "Artigo_Tecnico",
        "entrevista": "Entrevista",
        "tradução": "Traducao"
    };

    // Para cada revista
    for (let i = 0; i < window.state.revistas.length; i++) {
        const revista = window.state.revistas[i];
        
        // Pega o prefixo baseado no nome da revista
        let prefixo = null;
        for (let nomeRevista in mapaPrefixes) {
            if (revista.nome.includes(nomeRevista) || nomeRevista.includes(revista.nome)) {
                prefixo = mapaPrefixes[nomeRevista];
                break;
            }
        }
        
        // Se não encontrou prefixo, tenta criar um a partir do nome
        if (!prefixo) {
            // Pega a primeira parte do nome (antes de " -" ou " –" ou " (")
            let nomeBase = revista.nome.split(/[ –(-]/)[0].trim();
            // Remove caracteres especiais e espaços
            prefixo = nomeBase.replace(/[^\w\s]/g, '').replace(/\s+/g, '_');
        }

        // Para cada tipo de texto na revista
        if (revista.tipos_texto && revista.tipos_texto.length > 0) {
            for (let j = 0; j < revista.tipos_texto.length; j++) {
                const tipo = revista.tipos_texto[j];
                
                // Se já tem template definido no JSON, mantém
                if (tipo.template) continue;
                
                // Tenta encontrar um sufixo baseado no tipo de texto
                let sufixo = null;
                const tipoLower = tipo.tipo.toLowerCase();
                
                for (let chave in mapaSufixos) {
                    if (tipoLower.includes(chave)) {
                        sufixo = mapaSufixos[chave];
                        break;
                    }
                }
                
                // Se encontrou sufixo, tenta montar o caminho do template
                if (sufixo) {
                    const nomeArquivo = `${prefixo}_${sufixo}.docx`;
                    const caminhoTemplate = `templates/${nomeArquivo}`;
                    
                    // Não podemos verificar se o arquivo existe via JavaScript puro,
                    // então apenas atribuímos o caminho. O sistema tentará baixar
                    // e, se não existir, mostrará um toast de erro.
                    tipo.template = caminhoTemplate;
                    
                    console.log(`Template sugerido para ${revista.nome} - ${tipo.tipo}: ${caminhoTemplate}`);
                }
            }
        }
    }
}

// ==============================================
// DADOS DE EMERGÊNCIA (FALLBACK)
// ==============================================
function loadEmergencyData() {
    window.state.revistas = [
        {
            id: 1,
            nome: "Revista Brasileira de Ciências Sociais (RBCS)",
            instituicao: "ANPOCS",
            qualis: "A1",
            foco: "Ciências Sociais",
            descricao: "Revista da ANPOCS",
            avaliacao: "Duplo-cega",
            taxa: "Gratuita",
            links: {
                site: "https://anpocs.org.br",
                submissao: "https://www.scielo.br/rbcsoc"
            },
            tipos_texto: [],
            checklist: []
        },
        {
            id: 5,
            nome: "Revista Brasileira de Sociologia (RBS)",
            instituicao: "SBS",
            qualis: "A3",
            foco: "Sociologia",
            descricao: "Revista oficial da Sociedade Brasileira de Sociologia. Qualis A3 (quadriênio 2017-2020). NÃO permite preprint. Fluxo contínuo desde 2024.",
            avaliacao: "Duplo-cega",
            taxa: "Gratuita",
            preprint: "NÃO PERMITE",
            licenca: "CC BY-NC",
            links: {
                site: "https://rbs.sbsociologia.com.br",
                submissao: "https://rbs.sbsociologia.com.br/submissao"
            },
            tipos_texto: [
                {
                    tipo: "Artigo original",
                    extensao: "Até 50.000 caracteres",
                    detalhes: "Pesquisa original e inédita. Reflexões teóricas ou resultados empíricos.",
                    template: "templates/RBS_Artigo_Cientifico.docx"
                },
                {
                    tipo: "Ensaio teórico",
                    extensao: "Até 50.000 caracteres",
                    detalhes: "Ênfase em elaboração conceitual e originalidade.",
                    template: "templates/RBS_Ensaio_Teorico.docx"
                },
                {
                    tipo: "Resenha",
                    extensao: "Até 10.000 caracteres",
                    detalhes: "Obra publicada nos últimos 2 anos.",
                    template: "templates/RBS_Resenha.docx"
                }
            ],
            checklist: [
                "Texto inédito",
                "Arquivo sem identificação",
                "Resumo e Abstract",
                "ORCID obrigatório",
                "NÃO permite preprint"
            ]
        }
    ];
    window.state.normasGerais = {};

    try {
        renderQualisFilters();
        renderMainView();
        updateResultsCount();
    } catch (e) {
        console.error('Erro no fallback:', e);
        showToast('Falha crítica no fallback.', 'error');
    }
}

// ==============================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==============================================
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            window.state.searchTerm = e.target.value.toLowerCase();
            renderMainView();
            updateResultsCount();
        }, 300));
    }

    const clearSearch = document.getElementById('clear-search');
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                window.state.searchTerm = '';
                renderMainView();
                updateResultsCount();
                clearSearch.classList.add('hidden');
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                if (searchInput.value.length > 0) {
                    clearSearch.classList.remove('hidden');
                } else {
                    clearSearch.classList.add('hidden');
                }
            });
        }
    }
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema NEV/USP iniciado - Versão completa e estável');
    loadData();
    setupEventListeners();

    window.goToHome = function() {
        hideRevistaDetail();
        hideGeneralNorms();
        hideGuideView();
        window.state.filtroQualis = 'Todos';
        window.state.searchTerm = '';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        renderQualisFilters();
        renderMainView();
        updateResultsCount();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
