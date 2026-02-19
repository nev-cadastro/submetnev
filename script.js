// ==============================================
// SISTEMA DE NORMAS NEV/USP - VERSÃO COMPLETA
// ==============================================
// ✅ Dados corrigidos com fontes oficiais (2026)
// ✅ Qualis RBS corrigido para A3
// ✅ Seções gerais de ESTRUTURA e ROTEIRO adicionadas
// ✅ Guias por tipo de texto disponíveis antes da seleção
// ==============================================

// ==============================================
// ESTADO GLOBAL
// ==============================================
window.state = {
    revistas: [],
    normasGerais: {},
    filtroQualis: 'Todos',
    searchTerm: '',
    currentView: 'main',
    currentRevista: null
};

window.CONFIG = {
    JSON_PATH: 'data.json',
    CACHE_KEY: 'nev_normas_cache_v2',
    CACHE_DURATION: 60 * 60 * 1000
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
// SEÇÃO 1: GUIA GERAL DE ESTRUTURA ACADÊMICA
// ==============================================
function renderizarGuiaEstruturaGeral() {
    return `
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl border border-slate-700">
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
}

// ==============================================
// SEÇÃO 2: ROTEIROS UNIVERSAL POR TIPO DE TEXTO
// ==============================================
function renderizarRoteirosUniversais() {
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
    
    return `
        <div class="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-md border border-slate-200">
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
                ${tipos.map(tipo => `
                    <div class="border rounded-xl overflow-hidden bg-gradient-to-r ${coresBg[tipo.cor]} transition-all hover:shadow-md">
                        <div class="p-5 cursor-pointer" onclick="toggleRoteiroUniversal('${tipo.id}')">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <span class="text-2xl">${tipo.icone}</span>
                                    <div>
                                        <h3 class="font-bold text-slate-900">${tipo.titulo}</h3>
                                        <p class="text-xs text-slate-500 mt-0.5">${tipo.guia.descricao}</p>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-down text-slate-400 transition-transform" id="icone-${tipo.id}"></i>
                            </div>
                        </div>
                        <div id="roteiro-${tipo.id}" class="hidden border-t ${coresBg[tipo.cor].split(' ')[2]} p-5">
                            ${renderizarGuiaCompleta(tipo.guia, tipo.cor)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function toggleRoteiroUniversal(id) {
    const el = document.getElementById(`roteiro-${id}`);
    const icone = document.getElementById(`icone-${id}`);
    
    if (el) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            icone.classList.add('rotate-180');
        } else {
            el.classList.add('hidden');
            icone.classList.remove('rotate-180');
        }
    }
}

function renderizarGuiaCompleta(guia, cor = 'blue') {
    const coresBorder = {
        purple: 'border-purple-200',
        amber: 'border-amber-200',
        blue: 'border-blue-200',
        emerald: 'border-emerald-200',
        slate: 'border-slate-200'
    };
    
    const coresBg = {
        purple: 'bg-purple-50',
        amber: 'bg-amber-50',
        blue: 'bg-blue-50',
        emerald: 'bg-emerald-50',
        slate: 'bg-slate-50'
    };
    
    return `
        <div>
            <div class="grid md:grid-cols-2 gap-3">
                ${guia.etapas.map(etapa => `
                    <div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${coresBorder[cor] || 'border-blue-100'}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-lg">${etapa.icone}</span>
                            <h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>
                        </div>
                        <ul class="space-y-1">
                            ${etapa.itens.map(item => `
                                <li class="flex items-start gap-1.5 text-xs">
                                    <i class="fas fa-circle text-${cor}-400 text-[6px] mt-1.5"></i>
                                    <span class="text-slate-600">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            ${guia.dica ? `
                <div class="mt-3 bg-white/60 p-3 rounded-lg border ${coresBorder[cor] || 'border-blue-100'} flex items-start gap-2">
                    <i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                    <span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>
                </div>
            ` : ''}
            
            ${guia.citacao ? `
                <div class="mt-2 text-xs text-slate-500 italic border-t ${coresBorder[cor] || 'border-blue-100'} pt-2">
                    ${guia.citacao}
                </div>
            ` : ''}
        </div>
    `;
}

window.toggleRoteiroUniversal = toggleRoteiroUniversal;

// ==============================================
// INICIALIZAÇÃO
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema NEV/USP iniciado - Fontes oficiais 2026');
    loadData();
    setupEventListeners();
    
    // Adicionar seções gerais no main-view
    setTimeout(() => {
        const mainView = document.getElementById('main-view');
        if (mainView && !document.getElementById('guias-gerais-inserido')) {
            const filters = mainView.querySelector('.bg-white.p-6.rounded-xl.card-shadow.mb-8');
            if (filters) {
                // Inserir guia de estrutura geral ANTES dos filtros
                filters.insertAdjacentHTML('beforebegin', renderizarGuiaEstruturaGeral());
                
                // Inserir roteiros universais DEPOIS dos filtros, antes do grid
                const resultsCount = document.getElementById('results-count')?.parentElement;
                if (resultsCount) {
                    resultsCount.insertAdjacentHTML('beforebegin', renderizarRoteirosUniversais());
                }
                
                const marker = document.createElement('span');
                marker.id = 'guias-gerais-inserido';
                marker.style.display = 'none';
                mainView.appendChild(marker);
            }
        }
    }, 500);
});

// ==============================================
// CARREGAMENTO DE DADOS
// ==============================================
async function loadData() {
    showLoading(true);
    
    try {
        const response = await fetch(`${window.CONFIG.JSON_PATH}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (!data?.revistas?.length) throw new Error('Nenhuma revista encontrada');
        
        window.state.revistas = data.revistas;
        window.state.normasGerais = data.normas_gerais || {};
        
        console.log(`✅ Carregadas ${window.state.revistas.length} revistas`);
        console.log('🔍 Revistas com template:', window.state.revistas.filter(r => 
            r.tipos_texto?.some(t => t.template)
        ).map(r => r.nome));
        console.log('✅ Qualis RBS corrigido para A3 (fonte: Miguilim/IBICT)');
        console.log('✅ Política de preprint RBS corrigida: NÃO PERMITE');
        
        saveToCache(data);
        renderMainView();
        updateResultsCount();
        
    } catch (error) {
        console.error('❌ Erro ao carregar:', error);
        loadEmergencyData();
    } finally {
        showLoading(false);
    }
}

// ==============================================
// DADOS DE EMERGÊNCIA (COM CORREÇÕES)
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
    renderMainView();
    updateResultsCount();
    console.log('⚠️ Usando dados de emergência com correções aplicadas');
}

// ==============================================
// CACHE LOCAL
// ==============================================
function saveToCache(data) {
    try {
        const cacheData = { timestamp: Date.now(), data };
        localStorage.setItem(window.CONFIG.CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {}
}

// ==============================================
// EVENT LISTENERS
// ==============================================
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            window.state.searchTerm = e.target.value.toLowerCase();
            renderMainView();
            updateResultsCount();
        }, 300));
    }

    document.querySelectorAll('[data-type="qualis"]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-type="qualis"]').forEach(b => {
                b.classList.remove('active', 'bg-blue-700', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            this.classList.add('active', 'bg-blue-700', 'text-white');
            window.state.filtroQualis = this.dataset.value;
            renderMainView();
            updateResultsCount();
        });
    });
}

// ==============================================
// RENDERIZAÇÃO PRINCIPAL
// ==============================================
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

    grid.innerHTML = filtered.map(revista => `
        <div class="bg-white rounded-xl card-shadow hover:shadow-lg border border-slate-100 p-6 transition-all">
            <div class="flex justify-between items-start mb-3">
                <span class="px-3 py-1 ${revista.qualis === 'A1' ? 'bg-emerald-100 text-emerald-800' : revista.qualis === 'A2' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'} rounded-full text-xs font-bold">
                    Qualis ${revista.qualis || 'N/I'}
                </span>
                <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    <i class="fas fa-university mr-1"></i>${revista.instituicao?.split(' ').slice(0, 2).join(' ') || ''}
                </span>
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">${revista.nome}</h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-3">${revista.descricao || ''}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${revista.tipos_texto?.some(t => t.template) ? 
                    `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"><i class="fas fa-download mr-1"></i>Templates</span>` : ''}
                ${revista.preprint === 'NÃO PERMITE' ? 
                    `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"><i class="fas fa-ban mr-1"></i>Sem preprint</span>` : ''}
                ${revista.licenca ? 
                    `<span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">${revista.licenca}</span>` : ''}
            </div>
            
            <button onclick="showRevistaDetail(${revista.id})" 
    class="w-full bg-slate-50 hover:bg-blue-700 hover:text-white py-2.5 px-4 rounded-lg border border-slate-200 transition-all flex items-center justify-center gap-2">
    <i class="fas fa-file-alt"></i>
    Ver Diretrizes
</button>
        </div>
    `).join('');
}

function filterRevistas() {
    return window.state.revistas.filter(revista => {
        if (window.state.filtroQualis !== 'Todos' && revista.qualis !== window.state.filtroQualis) return false;
        if (window.state.searchTerm) {
            const text = `${revista.nome} ${revista.instituicao} ${revista.foco || ''}`.toLowerCase();
            return text.includes(window.state.searchTerm.toLowerCase());
        }
        return true;
    });
}

function updateResultsCount() {
    const el = document.getElementById('results-count');
    if (!el) return;
    const count = filterRevistas().length;
    const total = window.state.revistas.length;
    el.innerHTML = `<span class="font-bold text-blue-700">${count}</span> revistas encontradas <span class="text-slate-400">(de ${total})</span>`;
}

// ==============================================
// FUNÇÃO PARA RENDERIZAR GUIAS (REUTILIZÁVEL)
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
    
    return `
        <div class="mt-4 ${cores[guia.cor] || 'border-blue-200 bg-blue-50'} rounded-xl p-5 border">
            <div class="flex items-start gap-3 mb-4">
                <span class="text-2xl">${guia.icone}</span>
                <div>
                    <h5 class="font-bold text-slate-900">${guia.titulo}</h5>
                    <p class="text-xs text-slate-600 mt-0.5">${guia.descricao}</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-3">
                ${guia.etapas.map(etapa => `
                    <div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${cores[guia.cor]?.replace('bg', 'border') || 'border-blue-100'}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-lg">${etapa.icone}</span>
                            <h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>
                        </div>
                        <ul class="space-y-1">
                            ${etapa.itens.map(item => `
                                <li class="flex items-start gap-1.5 text-xs">
                                    <i class="fas fa-circle text-${guia.cor || 'blue'}-400 text-[6px] mt-1.5"></i>
                                    <span class="text-slate-600">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            ${guia.dica ? `
                <div class="mt-3 bg-white/60 p-3 rounded-lg border ${cores[guia.cor]?.replace('bg', 'border') || 'border-blue-100'} flex items-start gap-2">
                    <i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                    <span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>
                </div>
            ` : ''}
            
            ${guia.citacao ? `
                <div class="mt-2 text-xs text-slate-500 italic border-t ${cores[guia.cor]?.replace('bg', 'border') || 'border-blue-100'} pt-2">
                    ${guia.citacao}
                </div>
            ` : ''}
        </div>
    `;
}

// ==============================================
// VIEW DE DETALHE COM BOTÕES E GUIAS
// ==============================================
window.showRevistaDetail = function(id) {
    const revista = window.state.revistas.find(r => r.id === id);
    if (!revista) return;
    
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    
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
                    <p class="text-slate-600 text-lg">${revista.descricao}</p>
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
                    ${(revista.tipos_texto || []).map(tipo => {
                        const tipoLower = tipo.tipo.toLowerCase();
                        let guiaId = null;
                        if (tipoLower.includes('resenha')) guiaId = 'resenha';
                        else if (tipoLower.includes('artigo') || tipoLower.includes('dossiê') || tipoLower.includes('dossie')) guiaId = 'artigo';
                        else if (tipoLower.includes('ensaio')) guiaId = 'ensaio';
                        
                        return `
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
                                        
                                        <!-- GUIA DO TIPO DE TEXTO (se disponível) -->
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
                    }).join('')}
                </div>
            </div>
            
            <!-- Seções da revista (RBS) -->
            ${revista.secoes ? `
                <div class="mt-6 bg-purple-50 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <i class="fas fa-layer-group text-purple-700"></i>
                        Seções da Revista
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${revista.secoes.map(secao => `
                            <span class="bg-white px-3 py-1.5 rounded-full text-xs border border-purple-200 text-purple-800">
                                ${secao}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Checklist -->
            ${revista.checklist?.length ? `
                <div class="mt-6 bg-slate-50 rounded-xl p-6">
                    <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-700"></i>
                        Checklist de Submissão
                    </h3>
                    <ul class="grid md:grid-cols-2 gap-3">
                        ${revista.checklist.map(item => `
                            <li class="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-100">
                                <i class="fas fa-check-circle text-green-600 mt-1 shrink-0"></i>
                                <span class="text-sm text-slate-700">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <!-- Limites -->
            ${revista.limites ? `
                <div class="mt-6 bg-blue-50 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <i class="fas fa-ruler text-blue-700"></i>
                        Limites e Requisitos
                    </h3>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${Object.entries(revista.limites).map(([key, value]) => `
                            <div class="bg-white p-3 rounded-lg border border-blue-100">
                                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${key.replace(/_/g, ' ')}</span>
                                <p class="font-semibold text-slate-800 mt-1">${value}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
};

// ==============================================
// DOWNLOAD TEMPLATE
// ==============================================
window.downloadTemplate = function(templatePath) {
    if (!templatePath) {
        alert('Template não disponível');
        return;
    }
    
    console.log('📥 Baixando:', templatePath);
    
    try {
        const link = document.createElement('a');
        link.href = templatePath;
        link.download = templatePath.split('/').pop();
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('❌ Erro:', error);
        window.open(templatePath, '_blank');
    }
};

window.hideRevistaDetail = function() {
    document.getElementById('detail-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
};

// ==============================================
// NORMAS GERAIS
// ==============================================
window.showGeneralNorms = function() {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('general-norms-view').classList.remove('hidden');
    
    const n = window.state.normasGerais;
    document.getElementById('general-norms-content').innerHTML = `
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-shield-alt text-blue-700"></i>
                Ética e Integridade
            </h3>
            <ul class="space-y-2">
                ${(n.etica || []).map(i => `
                    <li class="flex items-start gap-2">
                        <i class="fas fa-check-circle text-green-600 mt-1"></i>
                        <span>${i}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-paint-brush text-purple-700"></i>
                Formatação
            </h3>
            <ul class="space-y-2">
                ${Object.entries(n.formatacao || {}).map(([k,v]) => `
                    <li class="flex items-start gap-2">
                        <i class="fas fa-arrow-right text-blue-600 mt-1"></i>
                        <span><strong>${k}:</strong> ${v}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200 md:col-span-2">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-clipboard-list text-orange-700"></i>
                Checklist Final
            </h3>
            <div class="grid md:grid-cols-2 gap-3">
                ${(n.checklist_final || []).map(item => `
                    <div class="flex items-start gap-2">
                        <i class="fas fa-check-square text-green-600 mt-1"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

window.hideGeneralNorms = function() {
    document.getElementById('general-norms-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
};

// ==============================================
// UTILITÁRIOS
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
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ==============================================
// EXPOR FUNÇÕES GLOBAIS
// ==============================================
window.showRevistaDetail = window.showRevistaDetail;
window.hideRevistaDetail = window.hideRevistaDetail;
window.showGeneralNorms = window.showGeneralNorms;
window.hideGeneralNorms = window.hideGeneralNorms;
window.downloadTemplate = window.downloadTemplate;
window.renderizarGuia = renderizarGuia;

console.log('✅ Sistema NEV/USP - Versão completa com fontes oficiais 2026');
console.log('✅ Correções aplicadas: Qualis RBS = A3, Preprint = NÃO PERMITE, Periodicidade = Fluxo contínuo');
console.log('✅ Novas seções: Estrutura Geral + Roteiros Universais');// ==============================================
// SISTEMA DE NORMAS NEV/USP - VERSÃO LIMPA
// ==============================================
// ✅ Cards mais enxutos na página inicial
// ✅ Guias de redação movidos para view separada
// ✅ Filtros dinâmicos de Qualis preservados
// ✅ Toasts, modal de termos, fallback mantidos
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
// BIBLIOTECA DE GUIAS POR TIPO DE TEXTO (INALTERADA)
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
// FUNÇÕES AUXILIARES (INALTERADAS)
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
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==============================================
// FILTROS QUALIS (INALTERADO)
// ==============================================

function renderQualisFilters() {
    const container = document.getElementById('qualis-filters');
    if (!container) return;

    const qualisValues = window.state.revistas
        .map(r => r.qualis)
        .filter((v, i, a) => v && a.indexOf(v) === i)
        .sort((a, b) => {
            const aNum = parseInt(a.substring(1)) || 0;
            const bNum = parseInt(b.substring(1)) || 0;
            if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
            return aNum - bNum;
        });

    let html = `
        <button class="filter-btn active px-5 py-2 rounded-full text-sm font-bold transition-all bg-blue-700 text-white shadow-sm" 
                data-type="qualis" data-value="Todos">
            Todos
        </button>
    `;

    qualisValues.forEach(qualis => {
        html += `
            <button class="filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all bg-white text-slate-700 border border-slate-300 hover:border-blue-400 hover:bg-blue-50" 
                    data-type="qualis" data-value="${qualis}">
                ${qualis}
            </button>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll('[data-type="qualis"]').forEach(btn => {
        btn.addEventListener('click', function () {
            container.querySelectorAll('[data-type="qualis"]').forEach(b => {
                b.classList.remove('active', 'bg-blue-700', 'text-white');
                b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-300');
            });
            this.classList.remove('bg-white', 'border', 'border-slate-300');
            this.classList.add('active', 'bg-blue-700', 'text-white');

            window.state.filtroQualis = this.dataset.value;
            renderMainView();
            updateResultsCount();
        });
    });
}

// ==============================================
// RENDERIZAÇÃO DA VIEW DE GUIAS (NOVA)
// ==============================================

function renderGuideView() {
    const container = document.getElementById('guide-content');
    if (!container) return;

    // Estrutura geral da pesquisa (cards dos 5 pilares)
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

    // Roteiros por tipo de texto (accordions)
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

    const roteirosHTML = `
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
                ${tipos.map(tipo => `
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
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = estruturaHTML + roteirosHTML;
}

function renderizarGuiaCompleta(guia, cor = 'blue') {
    const coresBorder = {
        purple: 'border-purple-200',
        amber: 'border-amber-200',
        blue: 'border-blue-200',
        emerald: 'border-emerald-200',
        slate: 'border-slate-200'
    };

    return `
        <div>
            <div class="grid md:grid-cols-2 gap-3">
                ${guia.etapas.map(etapa => `
                    <div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${coresBorder[cor] || 'border-blue-100'}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-lg">${etapa.icone}</span>
                            <h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>
                        </div>
                        <ul class="space-y-1">
                            ${etapa.itens.map(item => `
                                <li class="flex items-start gap-1.5 text-xs">
                                    <i class="fas fa-circle text-${cor}-400 text-[6px] mt-1.5"></i>
                                    <span class="text-slate-600">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            ${guia.dica ? `
                <div class="mt-3 bg-white/60 p-3 rounded-lg border ${coresBorder[cor] || 'border-blue-100'} flex items-start gap-2">
                    <i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                    <span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>
                </div>
            ` : ''}
        </div>
    `;
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

// ==============================================
// FUNÇÕES DE RENDERIZAÇÃO PRINCIPAL (CARDS LIMPOS)
// ==============================================

function filterRevistas() {
    return window.state.revistas.filter(revista => {
        if (window.state.filtroQualis !== 'Todos' && revista.qualis !== window.state.filtroQualis) return false;
        if (window.state.searchTerm) {
            const text = `${revista.nome} ${revista.instituicao} ${revista.foco || ''} ${revista.descricao || ''}`.toLowerCase();
            return text.includes(window.state.searchTerm.toLowerCase());
        }
        return true;
    });
}

function updateResultsCount() {
    const el = document.getElementById('results-count');
    if (!el) return;
    const count = filterRevistas().length;
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

    grid.innerHTML = filtered.map(revista => `
        <div class="bg-white rounded-xl card-shadow hover:shadow-lg border border-slate-100 p-6 transition-all">
            <div class="flex justify-between items-start mb-3">
                <span class="px-3 py-1 ${revista.qualis === 'A1' ? 'bg-emerald-100 text-emerald-800' : revista.qualis === 'A2' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'} rounded-full text-xs font-bold">
                    Qualis ${revista.qualis || 'N/I'}
                </span>
                <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    <i class="fas fa-university mr-1"></i>${revista.instituicao?.split(' ').slice(0, 2).join(' ') || ''}
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
    `).join('');
}

// ==============================================
// VIEW DE DETALHE DA REVISTA (INALTERADA, APENAS PEQUENOS AJUSTES)
// ==============================================

window.showRevistaDetail = function (id) {
    const revista = window.state.revistas.find(r => r.id === id);
    if (!revista) return;

    window.state.currentView = 'detail';
    window.state.currentRevista = revista;

    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');

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
                    <p class="text-slate-600 text-lg">${revista.descricao}</p>
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
                    ${(revista.tipos_texto || []).map(tipo => {
                        const tipoLower = tipo.tipo.toLowerCase();
                        let guiaId = null;
                        if (tipoLower.includes('resenha')) guiaId = 'resenha';
                        else if (tipoLower.includes('artigo') || tipoLower.includes('dossiê') || tipoLower.includes('dossie')) guiaId = 'artigo';
                        else if (tipoLower.includes('ensaio')) guiaId = 'ensaio';
                        
                        return `
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
                                        
                                        <!-- GUIA DO TIPO DE TEXTO (se disponível) -->
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
                    }).join('')}
                </div>
            </div>
            
            <!-- Seções da revista -->
            ${revista.secoes ? `
                <div class="mt-6 bg-purple-50 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <i class="fas fa-layer-group text-purple-700"></i>
                        Seções da Revista
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${revista.secoes.map(secao => `
                            <span class="bg-white px-3 py-1.5 rounded-full text-xs border border-purple-200 text-purple-800">
                                ${secao}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Checklist -->
            ${revista.checklist?.length ? `
                <div class="mt-6 bg-slate-50 rounded-xl p-6">
                    <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-700"></i>
                        Checklist de Submissão
                    </h3>
                    <ul class="grid md:grid-cols-2 gap-3">
                        ${revista.checklist.map(item => `
                            <li class="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-100">
                                <i class="fas fa-check-circle text-green-600 mt-1 shrink-0"></i>
                                <span class="text-sm text-slate-700">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <!-- Limites -->
            ${revista.limites ? `
                <div class="mt-6 bg-blue-50 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <i class="fas fa-ruler text-blue-700"></i>
                        Limites e Requisitos
                    </h3>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${Object.entries(revista.limites).map(([key, value]) => `
                            <div class="bg-white p-3 rounded-lg border border-blue-100">
                                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${key.replace(/_/g, ' ')}</span>
                                <p class="font-semibold text-slate-800 mt-1">${value}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
};

window.hideRevistaDetail = function () {
    document.getElementById('detail-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// DOWNLOAD DE TEMPLATE (INALTERADO)
// ==============================================
window.downloadTemplate = function (templatePath) {
    if (!templatePath) {
        showToast('Template não disponível para este tipo de texto.', 'warning');
        return;
    }

    console.log('📥 Baixando:', templatePath);

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
        console.error('❌ Erro:', error);
        window.open(templatePath, '_blank');
        showToast('Tentando abrir o template em nova aba...', 'info');
    }
};

// ==============================================
// NORMAS GERAIS (INALTERADO)
// ==============================================
window.showGeneralNorms = function () {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('general-norms-view').classList.remove('hidden');
    window.state.currentView = 'general';

    const n = window.state.normasGerais;
    document.getElementById('general-norms-content').innerHTML = `
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-shield-alt text-blue-700"></i>
                Ética e Integridade
            </h3>
            <ul class="space-y-2">
                ${(n.etica || []).map(i => `
                    <li class="flex items-start gap-2">
                        <i class="fas fa-check-circle text-green-600 mt-1"></i>
                        <span>${i}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-paint-brush text-purple-700"></i>
                Formatação
            </h3>
            <ul class="space-y-2">
                ${Object.entries(n.formatacao || {}).map(([k, v]) => `
                    <li class="flex items-start gap-2">
                        <i class="fas fa-arrow-right text-blue-600 mt-1"></i>
                        <span><strong>${k}:</strong> ${v}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-slate-200 md:col-span-2">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i class="fas fa-clipboard-list text-orange-700"></i>
                Checklist Final
            </h3>
            <div class="grid md:grid-cols-2 gap-3">
                ${(n.checklist_final || []).map(item => `
                    <div class="flex items-start gap-2">
                        <i class="fas fa-check-square text-green-600 mt-1"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

window.hideGeneralNorms = function () {
    document.getElementById('general-norms-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// VIEW DE GUIAS (NOVA)
// ==============================================
window.showGuideView = function () {
    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('guide-view').classList.remove('hidden');
    window.state.currentView = 'guide';
    renderGuideView();
};

window.hideGuideView = function () {
    document.getElementById('guide-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.state.currentView = 'main';
};

// ==============================================
// FUNÇÃO AUXILIAR PARA RENDERIZAR GUIAS (REUTILIZÁVEL)
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

    return `
        <div class="mt-4 ${cores[guia.cor] || 'border-blue-200 bg-blue-50'} rounded-xl p-5 border">
            <div class="flex items-start gap-3 mb-4">
                <span class="text-2xl">${guia.icone}</span>
                <div>
                    <h5 class="font-bold text-slate-900">${guia.titulo}</h5>
                    <p class="text-xs text-slate-600 mt-0.5">${guia.descricao || ''}</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-3">
                ${guia.etapas.map(etapa => `
                    <div class="bg-white/80 backdrop-blur-sm p-3 rounded-lg border ${cores[guia.cor]?.replace('bg', 'border') || 'border-blue-100'}">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-lg">${etapa.icone}</span>
                            <h6 class="font-bold text-slate-800 text-sm">${etapa.titulo}</h6>
                        </div>
                        <ul class="space-y-1">
                            ${etapa.itens.map(item => `
                                <li class="flex items-start gap-1.5 text-xs">
                                    <i class="fas fa-circle text-${guia.cor || 'blue'}-400 text-[6px] mt-1.5"></i>
                                    <span class="text-slate-600">${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            ${guia.dica ? `
                <div class="mt-3 bg-white/60 p-3 rounded-lg border ${cores[guia.cor]?.replace('bg', 'border') || 'border-blue-100'} flex items-start gap-2">
                    <i class="fas fa-lightbulb text-amber-500 mt-0.5"></i>
                    <span class="text-xs text-slate-700"><span class="font-bold">Dica:</span> ${guia.dica}</span>
                </div>
            ` : ''}
        </div>
    `;
}
window.renderizarGuia = renderizarGuia;

// ==============================================
// CARREGAMENTO DE DADOS (AJUSTADO: REMOVIDA CHAMADA A insertGuiasGerais)
// ==============================================
async function loadData() {
    showLoading(true);

    try {
        const response = await fetch(`${window.CONFIG.JSON_PATH}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        if (!data?.revistas?.length) throw new Error('Nenhuma revista encontrada');

        window.state.revistas = data.revistas;
        window.state.normasGerais = data.normas_gerais || {};

        console.log(`✅ Carregadas ${window.state.revistas.length} revistas`);

        try {
            const cacheData = { timestamp: Date.now(), data };
            localStorage.setItem(window.CONFIG.CACHE_KEY, JSON.stringify(cacheData));
        } catch (e) { /* falha silenciosa */ }

        renderQualisFilters();
        renderMainView();
        updateResultsCount();

    } catch (error) {
        console.error('❌ Erro ao carregar:', error);
        showToast('Erro ao carregar dados. Usando dados de emergência.', 'error');
        loadEmergencyData();
    } finally {
        showLoading(false);
    }
}

// ==============================================
// DADOS DE EMERGÊNCIA (FALLBACK) - MANTIDO
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

    renderQualisFilters();
    renderMainView();
    updateResultsCount();

    console.log('⚠️ Usando dados de emergência com correções aplicadas');
}

// ==============================================
// CONFIGURAÇÃO DE EVENT LISTENERS (INALTERADO)
// ==============================================
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            window.state.searchTerm = e.target.value.toLowerCase();
            renderMainView();
            updateResultsCount();
        }, 300));
    }

    const clearSearch = document.getElementById('clear-search');
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                window.state.searchTerm = '';
                renderMainView();
                updateResultsCount();
                clearSearch.classList.add('hidden');
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', () => {
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
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema NEV/USP iniciado - Versão limpa');
    loadData();
    setupEventListeners();

    window.goToHome = function () {
        hideRevistaDetail();
        hideGeneralNorms();
        hideGuideView(); // esconde a nova view
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
