// ==============================================
// SISTEMA DE NORMAS NEV/USP - VERSÃO CORRIGIDA
// ==============================================

window.state = {
    revistas: [],
    normasGerais: {},
    filtroQualis: 'Todos',
    searchTerm: '',
    currentView: 'main',
    currentRevista: null,
    usandoCache: false
};

window.CONFIG = {
    JSON_PATH: 'data.json',
    CACHE_KEY: 'nev_normas_cache',
    ADMIN_PASSWORD: 'submetnev@2026',
    CACHE_DURATION: 24 * 60 * 60 * 1000 // 24 horas
};

// ==============================================
// BIBLIOTECA DE GUIAS (COMPLETA)
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
function showLoading(show, target = 'revistas-grid') {
    const grid = document.getElementById(target);
    if (!grid) return;
    if (show) {
        grid.innerHTML = `<div class="col-span-full text-center py-16"><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-700 border-t-transparent"></div><p class="mt-4 text-slate-600">Carregando...</p></div>`;
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ==============================================
// CARREGAMENTO DE DADOS
// ==============================================
function loadData() {
    console.log('📥 Carregando dados...');
    showLoading(true);

    // Tenta carregar do cache primeiro
    try {
        const cached = localStorage.getItem(window.CONFIG.CACHE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            const idadeCache = Date.now() - parsed.timestamp;
            
            if (idadeCache < window.CONFIG.CACHE_DURATION) {
                console.log('✅ Usando cache local');
                window.state.revistas = parsed.data.revistas || [];
                window.state.normasGerais = parsed.data.normas_gerais || {};
                window.state.usandoCache = true;
                
                window.state.revistas.forEach(rev => {
                    if (!rev.imagem) rev.imagem = 'imagem/sem_imagem.png';
                });
                
                renderAll();
                showLoading(false);
                showToast('Dados carregados do cache.', 'info');
                return;
            } else {
                console.log('⏰ Cache expirado, buscando dados atualizados...');
            }
        }
    } catch (e) {
        console.warn('Erro ao ler cache:', e);
    }

    fetch(window.CONFIG.JSON_PATH + '?t=' + Date.now())
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('✅ Dados carregados do servidor');
            
            window.state.revistas = data.revistas || [];
            window.state.normasGerais = data.normas_gerais || {};
            window.state.usandoCache = false;
            
            window.state.revistas.forEach(rev => {
                if (!rev.imagem) rev.imagem = 'imagem/sem_imagem.png';
            });
            
            const cacheData = {
                timestamp: Date.now(),
                data: {
                    revistas: data.revistas || [],
                    normas_gerais: data.normas_gerais || {}
                }
            };
            localStorage.setItem(window.CONFIG.CACHE_KEY, JSON.stringify(cacheData));
            
            renderAll();
            showLoading(false);
            showToast('Dados atualizados com sucesso!', 'success');
        })
        .catch(err => {
            console.error('❌ Erro ao carregar dados:', err);
            
            try {
                const cached = localStorage.getItem(window.CONFIG.CACHE_KEY);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    window.state.revistas = parsed.data.revistas || [];
                    window.state.normasGerais = parsed.data.normas_gerais || [];
                    
                    window.state.revistas.forEach(rev => {
                        if (!rev.imagem) rev.imagem = 'imagem/sem_imagem.png';
                    });
                    
                    renderAll();
                    showLoading(false);
                    showToast('⚠️ Usando cache offline. Dados podem estar desatualizados.', 'warning');
                    return;
                }
            } catch (e) {
                console.error('Falha no cache de emergência');
            }
            
            loadEmergencyData();
        });
}

function loadEmergencyData() {
    console.log('🚨 Carregando dados de emergência');
    
    window.state.revistas = [
        {
            id: 1,
            nome: "Revista Brasileira de Ciências Sociais (RBCS)",
            instituicao: "ANPOCS",
            qualis: "A1",
            issn: "0102-6909",
            foco: "Ciências Sociais",
            descricao: "Revista da ANPOCS. Publica artigos inéditos e ensaios críticos.",
            avaliacao: "Duplo-cega",
            taxa: "Gratuita",
            periodicidade: "Fluxo contínuo",
            preprint: "Permitido",
            licenca: "CC BY",
            imagem: "imagem/rbcs.png",
            links: {
                site: "https://anpocs.org.br",
                submissao: "https://www.scielo.br/rbcsoc"
            },
            tipos_texto: [
                { 
                    tipo: "Artigo científico", 
                    extensao: "7.000 a 9.000 palavras", 
                    detalhes: "Pesquisa original e inédita.",
                    template: null
                }
            ],
            checklist: [
                "Texto inédito",
                "Arquivo anônimo",
                "Resumo e abstract",
                "ORCID obrigatório"
            ]
        },
        {
            id: 2,
            nome: "DADOS – Revista de Ciências Sociais",
            instituicao: "IESP-UERJ",
            qualis: "A1",
            issn: "0011-5258",
            foco: "Ciências Sociais",
            descricao: "Publicação trimestral do IESP-UERJ.",
            avaliacao: "Duplo-cega",
            taxa: "Gratuita",
            periodicidade: "Trimestral",
            preprint: "Permitido",
            licenca: "CC BY",
            imagem: "imagem/sem_imagem.png",
            links: {
                site: "https://www.scielo.br/j/dados"
            },
            tipos_texto: [
                {
                    tipo: "Artigo original",
                    extensao: "4.000 a 14.000 palavras",
                    detalhes: "Pesquisa original com contribuição teórica ou empírica.",
                    template: null
                }
            ],
            checklist: [
                "Texto inédito",
                "Arquivo anônimo",
                "Resumo e abstract",
                "ORCID obrigatório"
            ]
        }
    ];
    window.state.normasGerais = {};
    window.state.usandoCache = false;

    renderAll();
    showLoading(false);
    showToast('⚠️ Modo emergência ativo.', 'error');
}

function renderAll() {
    renderQualisFilters();
    renderMainView();
    updateResultsCount();
}

// ==============================================
// FILTROS QUALIS (CORRIGIDO)
// ==============================================
function renderQualisFilters() {
    const container = document.getElementById('qualis-filters');
    if (!container) return;
    
    const qualisSet = new Set();
    window.state.revistas.forEach(r => r.qualis && qualisSet.add(r.qualis));
    const qualisList = Array.from(qualisSet).sort((a, b) => {
        const aNum = parseInt(a.substring(1)) || 0;
        const bNum = parseInt(b.substring(1)) || 0;
        if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
        return aNum - bNum;
    });
    
    let html = `<button class="filter-btn active" data-qualis="Todos">Todos</button>`;
    qualisList.forEach(q => {
        html += `<button class="filter-btn" data-qualis="${q}">${q}</button>`;
    });
    container.innerHTML = html;
    
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.state.filtroQualis = btn.dataset.qualis;
            renderMainView();
            updateResultsCount();
        });
    });
}

// ==============================================
// FILTRAGEM E RENDERIZAÇÃO PRINCIPAL
// ==============================================
function filterRevistas() {
    return window.state.revistas.filter(rev => {
        if (window.state.filtroQualis !== 'Todos' && rev.qualis !== window.state.filtroQualis) return false;
        if (window.state.searchTerm) {
            const text = `${rev.nome} ${rev.instituicao || ''} ${rev.foco || ''} ${rev.descricao || ''}`.toLowerCase();
            return text.includes(window.state.searchTerm.toLowerCase());
        }
        return true;
    });
}

function updateResultsCount() {
    const el = document.getElementById('results-count');
    if (!el) return;
    const filtered = filterRevistas();
    const status = window.state.usandoCache ? '📦 cache' : '🌐 online';
    el.innerHTML = `<span class="font-bold text-blue-700">${filtered.length}</span> revistas encontradas <span class="text-slate-400">(de ${window.state.revistas.length}) <span class="text-xs">${status}</span></span>`;
}

function renderMainView() {
    const grid = document.getElementById('revistas-grid');
    if (!grid) return;
    
    const filtered = filterRevistas();
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-16 bg-slate-50 rounded-2xl"><i class="fas fa-search text-5xl text-slate-300 mb-4"></i><h3 class="text-xl font-bold text-slate-700">Nenhuma revista encontrada</h3><p class="text-slate-500">Tente ajustar os filtros</p></div>`;
        return;
    }
    
    let html = '';
    filtered.forEach(rev => {
        const qualisClass = rev.qualis === 'A1' ? 'bg-emerald-100 text-emerald-800' : 
                           rev.qualis === 'A2' ? 'bg-sky-100 text-sky-800' : 
                           'bg-amber-100 text-amber-800';
        const imagem = rev.imagem || 'imagem/sem_imagem.png';
        
        html += `
            <div class="revista-card">
                <div class="w-full h-40 bg-slate-100 flex items-center justify-center p-4">
                    <img src="${imagem}" alt="${rev.nome}" class="w-24 h-24 object-cover rounded-lg border border-slate-200 shadow-sm" onerror="this.src='imagem/sem_imagem.png'">
                </div>
                <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                        <span class="px-2 py-1 ${qualisClass} rounded-full text-xs font-bold">${rev.qualis || 'Sem Qualis'}</span>
                        <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">${rev.instituicao || ''}</span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-2">${rev.nome}</h3>
                    <p class="text-sm text-slate-600 mb-4 line-clamp-2">${rev.descricao || ''}</p>
                    <button onclick="showRevistaDetail(${rev.id})" class="w-full bg-blue-50 hover:bg-blue-700 hover:text-white py-2 rounded-lg border border-blue-200 transition flex items-center justify-center gap-2">
                        <i class="fas fa-file-alt"></i> Ver detalhes
                    </button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// ==============================================
// VIEW DE DETALHE DA REVISTA
// ==============================================
window.showRevistaDetail = function(id) {
    const revista = window.state.revistas.find(r => r.id === id);
    if (!revista) return;
    
    window.state.currentView = 'detail';
    window.state.currentRevista = revista;
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    renderRevistaDetail(revista);
};

function renderRevistaDetail(revista) {
    const container = document.getElementById('revista-detail-content');
    if (!container) return;
    
    const qualisClass = revista.qualis === 'A1' ? 'bg-emerald-100 text-emerald-800' : 
                       revista.qualis === 'A2' ? 'bg-sky-100 text-sky-800' : 
                       'bg-amber-100 text-amber-800';
    const imagem = revista.imagem || 'imagem/sem_imagem.png';
    
    const html = `
        <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div class="flex gap-6 flex-wrap md:flex-nowrap">
                <img src="${imagem}" alt="${revista.nome}" class="w-24 h-24 object-cover rounded-lg border" onerror="this.src='imagem/sem_imagem.png'">
                <div class="flex-1">
                    <div class="flex flex-wrap gap-2 mb-2">
                        <span class="px-3 py-1 ${qualisClass} rounded-full text-xs font-bold">${revista.qualis || 'Sem Qualis'}</span>
                        ${revista.issn ? `<span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs"><i class="fas fa-barcode mr-1"></i>ISSN ${revista.issn}</span>` : ''}
                    </div>
                    <h2 class="text-2xl font-bold text-slate-900 mb-2">${revista.nome}</h2>
                    <p class="text-slate-600">${revista.descricao || ''}</p>
                </div>
                <button onclick="hideRevistaDetail()" class="text-slate-400 hover:text-slate-600 p-2"><i class="fas fa-times text-2xl"></i></button>
            </div>

            <div class="flex flex-wrap gap-3 mt-6">
                <a href="${revista.links?.site || '#'}" target="_blank" class="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"><i class="fas fa-globe"></i> Site Oficial</a>
                <a href="${revista.links?.submissao || '#'}" target="_blank" class="bg-white border border-blue-700 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"><i class="fas fa-upload"></i> Submissão</a>
                <button onclick="hideRevistaDetail()" class="ml-auto bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-sm flex items-center gap-2"><i class="fas fa-arrow-left"></i> Voltar</button>
            </div>

            <div class="mt-6">
                <h3 class="font-bold text-lg mb-3">Informações básicas</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div><span class="text-xs text-slate-500 uppercase">Instituição</span><p class="font-medium">${revista.instituicao || 'N/I'}</p></div>
                    <div><span class="text-xs text-slate-500 uppercase">Avaliação</span><p class="font-medium">${revista.avaliacao || 'N/I'}</p></div>
                    <div><span class="text-xs text-slate-500 uppercase">Taxas</span><p class="font-medium text-green-700">${revista.taxa || 'Gratuita'}</p></div>
                    <div><span class="text-xs text-slate-500 uppercase">Periodicidade</span><p class="font-medium">${revista.periodicidade || 'N/I'}</p></div>
                    <div><span class="text-xs text-slate-500 uppercase">Preprint</span><p class="font-medium">${revista.preprint || 'Não informado'}</p></div>
                    <div><span class="text-xs text-slate-500 uppercase">Licença</span><p class="font-medium">${revista.licenca || 'CC BY'}</p></div>
                </div>
            </div>

            ${revista.tipos_texto && revista.tipos_texto.length > 0 ? `
            <div class="mt-6">
                <h3 class="font-bold text-lg mb-3">Tipos de texto aceitos</h3>
                <div class="space-y-4">
                    ${revista.tipos_texto.map(tipo => `
                        <div class="border rounded-lg p-4">
                            <h4 class="font-bold text-[#003366]">${tipo.tipo}</h4>
                            <p class="text-sm text-slate-500">${tipo.extensao || ''}</p>
                            <p class="text-sm mt-2">${tipo.detalhes || ''}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${revista.checklist && revista.checklist.length > 0 ? `
            <div class="mt-6">
                <h3 class="font-bold text-lg mb-3">Checklist de submissão</h3>
                <ul class="list-disc pl-5 space-y-2">
                    ${revista.checklist.map(item => `<li class="text-sm">${item}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;
    
    container.innerHTML = html;
}

window.hideRevistaDetail = function() {
    document.getElementById('detail-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// NORMAS GERAIS
// ==============================================
window.showGeneralNorms = function() {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('general-norms-view').classList.remove('hidden');
    window.state.currentView = 'general';
    
    const n = window.state.normasGerais;
    let content = '<div class="bg-white p-6 rounded-xl border">';
    
    if (n.etica && n.etica.length > 0) {
        content += '<h3 class="font-bold mb-3">Ética</h3><ul class="list-disc pl-5 mb-4">';
        n.etica.forEach(item => content += `<li class="text-sm mb-1">${item}</li>`);
        content += '</ul>';
    }
    
    if (n.formatacao) {
        content += '<h3 class="font-bold mb-3 mt-4">Formatação</h3><ul class="list-disc pl-5 mb-4">';
        for (let [k, v] of Object.entries(n.formatacao)) {
            content += `<li class="text-sm mb-1"><strong>${k}:</strong> ${v}</li>`;
        }
        content += '</ul>';
    }
    
    if (n.checklist_final && n.checklist_final.length > 0) {
        content += '<h3 class="font-bold mb-3 mt-4">Checklist Final</h3><ul class="list-disc pl-5">';
        n.checklist_final.forEach(item => content += `<li class="text-sm mb-1">${item}</li>`);
        content += '</ul>';
    }
    
    content += '</div>';
    document.getElementById('general-norms-content').innerHTML = content;
};

window.hideGeneralNorms = function() {
    document.getElementById('general-norms-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
};

// ==============================================
// GUIAS DE REDAÇÃO
// ==============================================
window.showGuideView = function() {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('guide-view').classList.remove('hidden');
    window.state.currentView = 'guide';
    
    const container = document.getElementById('guide-content');
    if (!container) return;
    
    let html = '<div class="space-y-4">';
    
    for (let [key, guia] of Object.entries(GUIAS)) {
        html += `
            <div class="bg-white rounded-xl border p-5">
                <div class="flex items-center gap-3 mb-3">
                    <span class="text-2xl">${guia.icone}</span>
                    <h3 class="font-bold text-lg">${guia.titulo}</h3>
                </div>
                <p class="text-sm text-slate-600 mb-3">${guia.descricao || ''}</p>
                <div class="space-y-3">
                    ${guia.etapas.map(etapa => `
                        <div class="border-l-4 border-blue-200 pl-3">
                            <h4 class="font-semibold text-sm">${etapa.titulo}</h4>
                            <ul class="text-xs text-slate-600 mt-1 space-y-1">
                                ${etapa.itens.map(item => `<li>• ${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                ${guia.dica ? `<div class="mt-3 text-xs bg-amber-50 p-2 rounded">💡 ${guia.dica}</div>` : ''}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
};

window.hideGuideView = function() {
    document.getElementById('guide-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
};

// ==============================================
// ÁREA RESTRITA (com funções faltantes adicionadas)
// ==============================================
window.adminLogin = function() {
    const pwd = document.getElementById('admin-password').value;
    if (pwd === window.CONFIG.ADMIN_PASSWORD) {
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        carregarSelectRevistas();
        showToast('Login efetuado.', 'success');
    } else {
        showToast('Senha incorreta.', 'error');
    }
};

function carregarSelectRevistas() {
    const select = document.getElementById('admin-revista-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Selecione uma revista para editar --</option>';
    window.state.revistas.forEach(rev => {
        select.innerHTML += `<option value="${rev.id}">${rev.nome}</option>`;
    });
}

// Funções adicionadas para evitar erros nos botões da área restrita
window.addNewRevista = function() {
    showToast('Função "Nova Revista" não implementada na versão atual.', 'warning');
};

window.resetToOriginal = function() {
    if (confirm('Isso irá restaurar os dados originais? O cache será limpo e a página recarregada.')) {
        localStorage.removeItem(window.CONFIG.CACHE_KEY);
        location.reload();
    }
};

window.exportJSON = function() {
    const data = { 
        revistas: window.state.revistas, 
        normas_gerais: window.state.normasGerais 
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON exportado.', 'success');
};

window.forceRefresh = function() {
    localStorage.removeItem(window.CONFIG.CACHE_KEY);
    showToast('Cache limpo. Recarregando...', 'info');
    setTimeout(() => location.reload(), 500);
};

// ==============================================
// EVENT LISTENERS
// ==============================================
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(e => {
            window.state.searchTerm = e.target.value;
            renderMainView();
            updateResultsCount();
        }, 300));
    }
    
    const clearBtn = document.getElementById('clear-search');
    if (clearBtn && searchInput) {
        searchInput.addEventListener('input', () => {
            clearBtn.classList.toggle('hidden', searchInput.value.length === 0);
        });
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            window.state.searchTerm = '';
            renderMainView();
            updateResultsCount();
            clearBtn.classList.add('hidden');
        });
    }
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SubmetNEV iniciado');
    
    // Configura favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = 'imagem/icone_submetnev.png';
    if (!document.querySelector('link[rel="icon"]')) document.head.appendChild(favicon);

    loadData();
    setupEventListeners();

    window.goToHome = function() {
        hideRevistaDetail();
        hideGeneralNorms();
        hideGuideView();
        window.state.filtroQualis = 'Todos';
        window.state.searchTerm = '';
        const si = document.getElementById('search-input');
        if (si) si.value = '';
        renderQualisFilters();
        renderMainView();
        updateResultsCount();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});