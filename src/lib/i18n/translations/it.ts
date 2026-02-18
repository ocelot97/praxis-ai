import type { Translations } from "./en";

export const it: Translations = {
  nav: {
    home: "Home",
    soluzioni: "Soluzioni",
    contact: "Contatti",
    getStarted: "Inizia Ora",
  },
  hero: {
    title: "Intelligenza Artificiale per il",
    titleAccent: "Tuo Studio Professionale",
    subtitle:
      "Progettiamo soluzioni AI che automatizzano le pratiche, semplificano la gestione documentale e trasformano la comunicazione con i clienti per gli studi professionali italiani.",
    cta: "Scopri Come",
  },
  simulation: {
    heading: "L'AI in Azione",
    selectProfession: "Seleziona la tua professione",
    cards: [
      {
        slug: "avvocati",
        title: "Studi Legali",
        tagline: "Analisi contrattuale, ricerca giuridica e gestione delle scadenze",
      },
      {
        slug: "commercialisti",
        title: "Studi Commercialisti",
        tagline: "Elaborazione fatture, conformita fiscale e automazione tributaria",
      },
      {
        slug: "consulenti-del-lavoro",
        title: "Consulenti del Lavoro",
        tagline: "Automazione buste paga, conformita giuslavoristica e flussi HR",
      },
      {
        slug: "odontoiatri",
        title: "Studi Odontoiatrici",
        tagline: "Gestione appuntamenti, comunicazione con i pazienti e documentazione clinica",
      },
      {
        slug: "architetti-ingegneri",
        title: "Architettura e Ingegneria",
        tagline: "Pratiche edilizie, monitoraggio progetti e computi metrici estimativi",
      },
      {
        slug: "geometri",
        title: "Geometri",
        tagline: "Moduli catastali, visure, accatastamenti e relazioni di perizia",
      },
    ],
    simulationLabels: {
      avvocati:
        "Guarda l'AI analizzare un contratto commerciale, individuare le clausole a rischio e incrociare la giurisprudenza pertinente in pochi secondi.",
      commercialisti:
        "Scopri come l'AI estrae i dati da un lotto di fatture, classifica le spese e prepara le registrazioni per il tuo gestionale contabile.",
      "consulenti-del-lavoro":
        "Osserva l'AI elaborare i dati mensili delle retribuzioni, verificare la conformita al CCNL applicato e generare le buste paga pronte per la revisione.",
      odontoiatri:
        "Scopri come l'AI gestisce le richieste di appuntamento, invia promemoria ai pazienti e redige le sintesi dei piani di cura.",
      "architetti-ingegneri":
        "Guarda l'AI assemblare la documentazione per le pratiche edilizie, verificare i requisiti comunali e generare un computo metrico estimativo.",
      geometri:
        "Scopri come l'AI compila automaticamente i moduli DOCFA e PREGEO dai dati di rilievo, valida le voci e prepara le pratiche per il catasto.",
    },
  },
  calculator: {
    heading: "Calcola il Tuo Risparmio",
    clientsLabel: "Clienti attivi",
    clientsPlaceholder: "es. 150",
    hoursLabel: "Ore settimanali dedicate all'amministrazione",
    hoursPlaceholder: "es. 20",
    resultHours: "Ore risparmiate a settimana",
    resultCost: "Risparmio mensile stimato",
    cta: "Guarda l'AI in Azione",
    breakdownHeading: "Dove Risparmi Tempo",
    methodologyTitle: "La Nostra Metodologia",
    methodologyText: "Le stime si basano sui dati raccolti da studi professionali italiani che utilizzano soluzioni AI simili. I risultati effettivi possono variare in base alla complessita delle pratiche e al volume di lavoro.",
    beforeLabel: "Attuale",
    afterLabel: "Con AI",
    savingsLabel: "Risparmio",
    perWeek: "/settimana",
    perMonth: "/mese",
    suggestedHint: "Per {clients} clienti, le ore tipiche sono {low}-{high}h/settimana",
  },
  process: {
    heading: "Come Funziona",
    steps: [
      {
        title: "Analisi dello Studio",
        description:
          "Studiamo i vostri flussi di lavoro attuali, identifichiamo le attivita ripetitive e i colli di bottiglia, e mappiamo le opportunita a maggiore impatto per l'integrazione dell'AI.",
      },
      {
        title: "Configurazione AI",
        description:
          "Costruiamo e configuriamo soluzioni AI ottimizzate per la vostra area professionale, il contesto normativo e la tipologia di clientela.",
      },
      {
        title: "Attivazione e Supporto",
        description:
          "Implementiamo con il minimo impatto sulle operazioni quotidiane, formiamo il vostro team e forniamo supporto continuo e ottimizzazione nel tempo.",
      },
    ],
  },
  cta: {
    heading: "Pronti a Innovare il Vostro Studio?",
    subtitle:
      "Scoprite come l'intelligenza artificiale puo migliorare l'efficienza, ridurre gli errori e permettere al vostro team di concentrarsi sul lavoro professionale ad alto valore.",
    scheduleConsultation: "Prenota una Consulenza",
    browseSolutions: "Esplora le Soluzioni",
  },
  footer: {
    description:
      "Trasformiamo gli studi professionali con intelligenza artificiale su misura. Dall'analisi iniziale al supporto continuativo, portiamo efficienza misurabile nel vostro studio.",
    soluzioniHeading: "Soluzioni",
    companyHeading: "Azienda",
    solutionLinks: [
      { label: "Studi Legali", href: "/soluzioni/avvocati" },
      { label: "Studi Commercialisti", href: "/soluzioni/commercialisti" },
      { label: "Consulenti del Lavoro", href: "/soluzioni/consulenti-del-lavoro" },
      { label: "Studi Odontoiatrici", href: "/soluzioni/odontoiatri" },
      { label: "Architettura e Ingegneria", href: "/soluzioni/architetti-ingegneri" },
      { label: "Geometri", href: "/soluzioni/geometri" },
    ],
    companyLinks: [
      { label: "Tutte le Soluzioni", href: "/soluzioni" },
      { label: "Contatti", href: "/contact" },
    ],
    copyright: "Praxis AI. Tutti i diritti riservati.",
    privacyPolicy: "Informativa sulla Privacy",
    termsOfService: "Termini di Servizio",
  },
  contactPage: {
    title: "Parliamo del Vostro Studio",
    subtitle:
      "Che stiate esplorando l'AI per la prima volta o desideriate ampliare un'implementazione esistente, siamo qui per aiutarvi. Raccontateci del vostro studio professionale e vi ricontatteremo entro 24 ore.",
  },
  contactForm: {
    heading: "Contattateci",
    nameLabel: "Nome",
    namePlaceholder: "Il vostro nome",
    nameRequired: "Il nome e obbligatorio",
    emailLabel: "Email",
    emailPlaceholder: "nome@vostrostudio.it",
    emailRequired: "L'email e obbligatoria",
    emailInvalid: "Inserite un indirizzo email valido",
    companyLabel: "Studio / Societa",
    companyPlaceholder: "Nome dello studio (facoltativo)",
    messageLabel: "Messaggio",
    messagePlaceholder:
      "Descriveteci il vostro studio e le sfide che desiderate affrontare...",
    messageRequired: "Il messaggio e obbligatorio",
    submitError:
      "Si e verificato un errore. Riprovate o scriveteci direttamente via email.",
    sendMessage: "Invia Messaggio",
    thankYou: "Grazie!",
    successMessage:
      "Abbiamo ricevuto il vostro messaggio e vi ricontatteremo entro 24 ore.",
    sendAnother: "Invia un Altro Messaggio",
  },
  soluzioniHub: {
    title: "Soluzioni AI per Studi Professionali",
    subtitle:
      "Ogni professione ha flussi di lavoro, normative e aspettative dei clienti specifiche. Costruiamo sistemi AI su misura per ciascuna.",
  },
  professions: {
    avvocati: {
      title: "Studi Legali",
      headline: "Intelligenza Giuridica Potenziata dall'AI",
      subtitle:
        "Riducete il tempo dedicato alla redazione ripetitiva, accelerate la ricerca giuridica e non perdete mai piu una scadenza processuale.",
      painPoints: [
        {
          title: "Redazione Contrattuale Ripetitiva",
          description:
            "Ore impiegate nella stesura, revisione e comparazione di contratti standard e documenti legali che seguono schemi prevedibili.",
        },
        {
          title: "Ricerca Giuridica su Fonti Multiple",
          description:
            "Ricerca tra banche dati giurisprudenziali, archivi legislativi e fonti dottrinali per individuare precedenti e interpretazioni pertinenti.",
        },
        {
          title: "Gestione dei Termini Processuali",
          description:
            "Monitoraggio dei termini processuali su decine di fascicoli attivi, dove una singola scadenza mancata puo avere conseguenze gravi per i clienti.",
        },
        {
          title: "Carico di Comunicazione con i Clienti",
          description:
            "Gestione delle richieste ricorrenti sullo stato delle cause, redazione di aggiornamenti di routine e gestione delle aspettative su un ampio portafoglio di pratiche.",
        },
      ],
      solutions: [
        {
          title: "Analisi Documentale Intelligente",
          description:
            "L'AI legge, analizza e confronta contratti e documenti legali, identificando clausole a rischio, incongruenze e lacune.",
          features: [
            "Valutazione del rischio clausola per clausola",
            "Confronto automatico con modelli standard",
            "Rilevamento di anomalie nei termini contrattuali",
            "Analisi incrociata su documenti multipli",
          ],
        },
        {
          title: "Assistente alla Ricerca Giuridica",
          description:
            "Ricerca semantica su giurisprudenza, legislazione e dottrina che individua i precedenti rilevanti in pochi secondi anziche in ore.",
          features: [
            "Interrogazioni in linguaggio naturale",
            "Mappatura della rete di citazioni",
            "Risultati ordinati per rilevanza con link alle fonti",
            "Sintesi automatica della giurisprudenza",
          ],
        },
        {
          title: "Gestione Automatizzata delle Scadenze",
          description:
            "Monitora tutti i termini processuali, le udienze e gli adempimenti su tutto il contenzioso dello studio con avvisi intelligenti.",
          features: [
            "Estrazione automatica delle scadenze dai documenti processuali",
            "Calcolo a cascata dei termini collegati",
            "Integrazione con il calendario di studio",
            "Avvisi di escalation per scadenze imminenti",
          ],
        },
      ],
      demoIntro:
        "Scoprite come la nostra AI analizza un contratto commerciale, individua le clausole a rischio e genera un report di revisione strutturato.",
      demoCta: "Prenota una Consulenza",
    },
    commercialisti: {
      title: "Studi Commercialisti",
      headline: "Intelligenza Fiscale Guidata dall'AI",
      subtitle:
        "Automatizzate l'elaborazione delle fatture, anticipate i cambiamenti normativi e eliminate i colli di bottiglia nell'inserimento dati su tutto il portafoglio clienti.",
      painPoints: [
        {
          title: "Estrazione Manuale dei Dati dalle Fatture",
          description:
            "Ore dedicate all'estrazione di dati da centinaia di fatture ogni mese, con inserimento manuale di importi, codici IVA e dettagli dei fornitori.",
        },
        {
          title: "Adempimenti Fiscali in Continua Evoluzione",
          description:
            "Restare al passo con l'evoluzione degli adempimenti fiscali, i nuovi obblighi dichiarativi e le mutevoli interpretazioni del codice tributario che impattano ogni cliente.",
        },
        {
          title: "Raccolta Documentale dai Clienti",
          description:
            "Rincorrere i clienti per fatture mancanti, ricevute e documentazione di supporto, creando ritardi che si ripercuotono su ogni scadenza fiscale.",
        },
        {
          title: "Riconciliazione e Rilevamento Errori",
          description:
            "Controlli incrociati tra estratti conto, fatture e registri contabili per individuare discrepanze prima che diventino problemi di conformita.",
        },
      ],
      solutions: [
        {
          title: "Intelligenza sulle Fatture",
          description:
            "Estrae, classifica e valida automaticamente i dati delle fatture in qualsiasi formato, alimentando il vostro gestionale con dati strutturati e verificati.",
          features: [
            "Estrazione OCR da PDF, scansioni e fotografie",
            "Classificazione automatica dei codici IVA",
            "Rilevamento fatture duplicate",
            "Integrazione diretta con i principali gestionali contabili",
          ],
        },
        {
          title: "Automazione della Conformita Fiscale",
          description:
            "Monitora le modifiche normative in tempo reale e applica automaticamente le regole aggiornate ai calcoli e alle dichiarazioni.",
          features: [
            "Monitoraggio normativo in tempo reale",
            "Applicazione automatica delle regole al portafoglio clienti",
            "Validazione pre-invio della conformita",
            "Documentazione della traccia di audit",
          ],
        },
        {
          title: "Comunicazione AI con i Clienti",
          description:
            "Automatizza le richieste documentali, i solleciti di pagamento e gli aggiornamenti di stato, assicurando che i clienti forniscano tutto il necessario nei tempi previsti.",
          features: [
            "Campagne automatizzate di raccolta documenti",
            "Sequenze intelligenti di sollecito",
            "Portale clienti per il caricamento documenti",
            "Comunicazioni programmate in base alle scadenze",
          ],
        },
      ],
      demoIntro:
        "Guardate come la nostra AI elabora un lotto di fatture, estrae i dati principali, classifica le spese e segnala le anomalie per la revisione.",
      demoCta: "Prenota una Consulenza",
    },
    "consulenti-del-lavoro": {
      title: "Consulenti del Lavoro",
      headline: "AI per Paghe e Conformita Giuslavoristica",
      subtitle:
        "Semplificate l'elaborazione mensile delle buste paga, automatizzate il monitoraggio normativo e riducete il carico amministrativo delle comunicazioni INPS e INAIL.",
      painPoints: [
        {
          title: "Complessita dell'Elaborazione Paghe Mensile",
          description:
            "Elaborazione delle buste paga per centinaia di dipendenti su piu clienti, ciascuno con CCNL diversi, benefit e componenti variabili della retribuzione.",
        },
        {
          title: "Normativa Giuslavoristica in Continua Evoluzione",
          description:
            "Restare al passo con le frequenti modifiche alla legislazione del lavoro, alle aliquote contributive e ai requisiti di conformita che variano per settore e territorio.",
        },
        {
          title: "Comunicazioni Amministrative Ripetitive",
          description:
            "Preparazione e invio di comunicazioni ricorrenti a INPS, INAIL e altri enti pubblici, spesso con scadenze stringenti e nessun margine di errore.",
        },
        {
          title: "Documentazione per le Assunzioni",
          description:
            "Gestione del flusso documentale per nuove assunzioni, variazioni contrattuali e cessazioni su un portafoglio clienti eterogeneo.",
        },
      ],
      solutions: [
        {
          title: "Automazione delle Buste Paga",
          description:
            "Elaborazione AI delle buste paga che gestisce le variabili retributive, applica le disposizioni del CCNL corretto e genera cedolini pronti per la revisione.",
          features: [
            "Motore di calcolo multi-CCNL",
            "Elaborazione automatica delle componenti variabili",
            "Ottimizzazione delle ritenute fiscali",
            "Elaborazione in blocco su portafogli multi-cliente",
          ],
        },
        {
          title: "Monitoraggio della Conformita",
          description:
            "Monitora in modo continuativo le modifiche normative e segnala gli impatti sul vostro portafoglio clienti prima delle scadenze.",
          features: [
            "Monitoraggio in tempo reale della normativa del lavoro",
            "Analisi dell'impatto specifico per cliente",
            "Avvisi proattivi sulle scadenze",
            "Sintesi delle novita normative",
          ],
        },
        {
          title: "Automazione dei Flussi Amministrativi",
          description:
            "Automatizza la preparazione e l'invio delle comunicazioni a INPS, INAIL e altri enti, riducendo lo sforzo manuale e il rischio di errore.",
          features: [
            "Generazione documenti basata su modelli",
            "Compilazione automatica dei moduli di invio",
            "Tracciamento delle pratiche e conferme di ricezione",
            "Validazione degli errori prima dell'invio",
          ],
        },
      ],
      demoIntro:
        "Osservate come la nostra AI elabora i dati retributivi, applica le disposizioni del CCNL e genera buste paga conformi pronte per la revisione.",
      demoCta: "Prenota una Consulenza",
    },
    odontoiatri: {
      title: "Studi Odontoiatrici",
      headline: "AI per la Gestione Moderna dello Studio Dentistico",
      subtitle:
        "Eliminate il caos degli appuntamenti, automatizzate la comunicazione con i pazienti e producete documentazione clinica in modo efficiente.",
      painPoints: [
        {
          title: "Appuntamenti Mancati e Disorganizzazione dell'Agenda",
          description:
            "Mancati introiti per appuntamenti saltati e la gestione continua di riprogrammazioni, liste d'attesa e cancellazioni dell'ultimo minuto.",
        },
        {
          title: "Documentazione dei Piani di Cura",
          description:
            "Tempo dedicato alla redazione di piani di cura dettagliati, moduli di consenso e note cliniche, che sottrae attenzione alla cura del paziente.",
        },
        {
          title: "Follow-Up e Richiami dei Pazienti",
          description:
            "Tenere traccia delle scadenze dei richiami, dei follow-up post-trattamento e dei promemoria per le cure preventive su centinaia di pazienti attivi.",
        },
      ],
      solutions: [
        {
          title: "Agenda Intelligente",
          description:
            "Gestione appuntamenti basata sull'AI che riduce le assenze, ottimizza l'utilizzo della poltrona e riempie intelligentemente le cancellazioni.",
          features: [
            "Identificazione predittiva delle assenze",
            "Sequenze automatizzate di conferma e promemoria",
            "Gestione intelligente della lista d'attesa",
            "Programmazione ottimizzata in base alla durata del trattamento",
          ],
        },
        {
          title: "Documentazione Clinica AI",
          description:
            "Genera piani di cura strutturati, documenti di consenso e sintesi cliniche a partire da input minimi del professionista.",
          features: [
            "Generazione del piano di cura dai codici diagnostici",
            "Preparazione automatizzata dei moduli di consenso",
            "Strutturazione delle note cliniche",
            "Sintesi del trattamento comprensibili per il paziente",
          ],
        },
        {
          title: "Coinvolgimento del Paziente",
          description:
            "Sistema di comunicazione automatizzato che gestisce i richiami, le istruzioni post-trattamento e le campagne di prevenzione.",
          features: [
            "Automazione dei piani di richiamo",
            "Sequenze di follow-up post-trattamento",
            "Promemoria per le cure preventive",
            "Messaggistica bidirezionale con il paziente",
          ],
        },
      ],
      demoIntro:
        "Scoprite come la nostra AI gestisce la programmazione degli appuntamenti, invia i promemoria ai pazienti e genera una sintesi del piano di cura.",
      demoCta: "Prenota una Consulenza",
    },
    "architetti-ingegneri": {
      title: "Architettura e Ingegneria",
      headline: "AI per i Professionisti della Progettazione e delle Costruzioni",
      subtitle:
        "Automatizzate le pratiche edilizie, migliorate la stima dei costi di progetto e orchestrate flussi di lavoro complessi su piu commesse.",
      painPoints: [
        {
          title: "Complessita delle Pratiche Edilizie",
          description:
            "L'assemblaggio delle pratiche edilizie richiede la navigazione tra regolamenti comunali, la raccolta di numerosi allegati e la conformita a normative edilizie in costante evoluzione.",
        },
        {
          title: "Variabilita nella Stima dei Costi",
          description:
            "Produrre computi metrici estimativi accurati che tengano conto delle oscillazioni dei prezzi dei materiali, dei costi di manodopera e dei requisiti normativi per diverse tipologie di progetto.",
        },
        {
          title: "Coordinamento Multi-Commessa",
          description:
            "Gestione di tempistiche, deliverable e assegnazioni del team su piu progetti in contemporanea con stakeholder e iter autorizzativi diversi.",
        },
        {
          title: "Monitoraggio della Conformita Normativa",
          description:
            "Restare aggiornati su norme edilizie, standard di sicurezza e regolamenti ambientali che variano per comune e tipologia di intervento.",
        },
      ],
      solutions: [
        {
          title: "Generazione Documentale per le Pratiche",
          description:
            "Automatizza l'assemblaggio delle pratiche edilizie, verifica i requisiti comunali e genera pacchetti documentali conformi.",
          features: [
            "Assemblaggio documentale basato su modelli",
            "Incrocio automatico con i regolamenti comunali",
            "Automazione della checklist degli allegati",
            "Validazione della conformita prima della presentazione",
          ],
        },
        {
          title: "Intelligenza di Progetto",
          description:
            "Stima dei costi, monitoraggio dell'avanzamento e allocazione delle risorse basati sull'AI, che apprendono dai dati storici dei vostri progetti.",
          features: [
            "Computi metrici estimativi basati sui dati",
            "Monitoraggio e previsione dei prezzi dei materiali",
            "Controllo delle milestone di avanzamento",
            "Avvisi sulle varianze di budget",
          ],
        },
        {
          title: "Orchestrazione dei Flussi di Lavoro",
          description:
            "Sistema di gestione multi-commessa che coordina tempistiche, assegna risorse e monitora i deliverable su tutto il portafoglio.",
          features: [
            "Gestione delle tempistiche tra progetti",
            "Ottimizzazione dell'allocazione risorse",
            "Automazione delle comunicazioni con gli stakeholder",
            "Dashboard di monitoraggio dei deliverable",
          ],
        },
      ],
      demoIntro:
        "Guardate come la nostra AI assembla la documentazione per le pratiche edilizie, verifica i requisiti di conformita e genera un computo metrico estimativo.",
      demoCta: "Prenota una Consulenza",
    },
    geometri: {
      title: "Geometri",
      headline: "AI per i Professionisti del Catasto e del Rilievo",
      subtitle:
        "Automatizzate la compilazione dei moduli DOCFA e PREGEO, semplificate la reportistica dei rilievi e snellite le pratiche con l'Agenzia del Territorio.",
      painPoints: [
        {
          title: "Compilazione Manuale dei Moduli Catastali",
          description:
            "La compilazione manuale dei moduli DOCFA e PREGEO e dispendiosa e soggetta a errori, con requisiti di formato stringenti che richiedono massima precisione.",
        },
        {
          title: "Onere della Reportistica dei Rilievi",
          description:
            "Trasformare i dati grezzi delle misurazioni in relazioni tecniche strutturate, annotazioni su elaborati grafici e documenti pronti per la consegna al cliente.",
        },
        {
          title: "Coordinamento con l'Agenzia del Territorio",
          description:
            "Gestione delle presentazioni all'Agenzia del Territorio, monitoraggio dello stato delle pratiche, gestione dei rifiuti e verifica della completezza della documentazione.",
        },
      ],
      solutions: [
        {
          title: "Automazione Catastale",
          description:
            "Compila automaticamente i moduli DOCFA e PREGEO a partire dai dati di rilievo, valida le voci rispetto ai requisiti del catasto e segnala potenziali problemi prima dell'invio.",
          features: [
            "Compilazione automatica dei moduli dai dati di rilievo",
            "Validazione integrata rispetto alle regole catastali",
            "Rilevamento errori e suggerimenti di correzione",
            "Elaborazione in blocco per immobili multipli",
          ],
        },
        {
          title: "Intelligenza del Rilievo",
          description:
            "Semplifica la trasformazione dei dati grezzi delle misurazioni in relazioni tecniche complete e documentazione professionale.",
          features: [
            "Generazione automatica delle relazioni dai dati di campo",
            "Assistenza nelle annotazioni tecniche",
            "Confronto con dati storici",
            "Formattazione professionale dei documenti per il cliente",
          ],
        },
        {
          title: "Integrazione con il Catasto",
          description:
            "Automatizza la preparazione e il tracciamento delle pratiche presso l'Agenzia del Territorio, riducendo il carico amministrativo.",
          features: [
            "Assemblaggio del fascicolo di presentazione",
            "Tracciamento dello stato e notifiche",
            "Analisi dei rifiuti e indicazioni per la risoluzione",
            "Verifica della completezza documentale",
          ],
        },
      ],
      demoIntro:
        "Scoprite come la nostra AI compila automaticamente i moduli catastali dai dati di rilievo, valida le voci e prepara il fascicolo per la presentazione al catasto.",
      demoCta: "Prenota una Consulenza",
    },
  },
  calculatorBreakdown: {
    avvocati: [
      { area: "Analisi Contrattuale", tooltip: "Basato su una media di 3.5 contratti/settimana per 120 clienti. L'AI riduce il tempo di revisione da 45min a 12min per contratto.", weight: 0.43 },
      { area: "Ricerca Giurisprudenziale", tooltip: "L'AI ricerca nelle banche dati giurisprudenziali in secondi contro 30-45 min di ricerca manuale per query.", weight: 0.28 },
      { area: "Gestione Scadenze", tooltip: "Il monitoraggio automatico e gli avvisi eliminano il 95% dello sforzo manuale di monitoraggio delle scadenze.", weight: 0.15 },
      { area: "Comunicazione Clienti", tooltip: "L'AI prepara aggiornamenti e report di stato di routine, riducendo i tempi di comunicazione del 60%.", weight: 0.14 },
    ],
    commercialisti: [
      { area: "Elaborazione Fatture", tooltip: "L'AI estrae dati dalle fatture in secondi contro 3-5 min di inserimento manuale per fattura.", weight: 0.40 },
      { area: "Adempimenti Fiscali", tooltip: "Monitoraggio normativo automatico e applicazione delle regole su tutti i portafogli clienti.", weight: 0.25 },
      { area: "Riconciliazione", tooltip: "L'AI riconcilia automaticamente le transazioni tra estratti conto, fatture e registri.", weight: 0.20 },
      { area: "Solleciti Clienti", tooltip: "Richieste documenti e solleciti di pagamento automatizzati riducono i tempi di follow-up del 70%.", weight: 0.15 },
    ],
    "consulenti-del-lavoro": [
      { area: "Elaborazione Buste Paga", tooltip: "L'AI applica le disposizioni CCNL e calcola le retribuzioni variabili per piu clienti.", weight: 0.40 },
      { area: "Monitoraggio Normativo", tooltip: "Monitoraggio continuo delle modifiche normative con analisi automatica dell'impatto.", weight: 0.25 },
      { area: "Comunicazioni Obbligatorie", tooltip: "Compilazione automatica di UniLav e altri moduli per INPS, INAIL e Centro per l'Impiego.", weight: 0.20 },
      { area: "Documentazione Assunzioni", tooltip: "L'AI genera pacchetti documentali per le assunzioni da dati minimi.", weight: 0.15 },
    ],
    odontoiatri: [
      { area: "Gestione Appuntamenti", tooltip: "La programmazione AI riduce le assenze del 40% e ottimizza l'utilizzo della poltrona.", weight: 0.35 },
      { area: "Comunicazione Pazienti", tooltip: "Promemoria, richiami e follow-up automatici via SMS ed email.", weight: 0.30 },
      { area: "Documentazione Clinica", tooltip: "L'AI struttura le note cliniche dall'input del professionista, risparmiando 10-15 min per paziente.", weight: 0.20 },
      { area: "Pianificazione Terapeutica", tooltip: "L'AI genera piani terapeutici e preventivi dai codici diagnostici.", weight: 0.15 },
    ],
    "architetti-ingegneri": [
      { area: "Documentazione Edilizia", tooltip: "L'AI assembla le pratiche edilizie e verifica i requisiti comunali.", weight: 0.35 },
      { area: "Monitoraggio Commesse", tooltip: "Monitoraggio automatico delle milestone e allocazione risorse tra i progetti.", weight: 0.25 },
      { area: "Preventivazione", tooltip: "Stime basate su dati storici e prezzi correnti dei materiali.", weight: 0.25 },
      { area: "Conformita Normativa", tooltip: "Monitoraggio continuo degli aggiornamenti normativi edilizi e di sicurezza.", weight: 0.15 },
    ],
    geometri: [
      { area: "Pratiche Catastali", tooltip: "L'AI compila automaticamente DOCFA e PREGEO dai dati di rilievo con validazione.", weight: 0.40 },
      { area: "Elaborazione Rilievi", tooltip: "Trasforma i dati grezzi di misurazione in report strutturati e documenti finali.", weight: 0.25 },
      { area: "Invii al Catasto", tooltip: "Assemblaggio automatico dei pacchetti di invio e monitoraggio dello stato.", weight: 0.20 },
      { area: "Validazione Dati", tooltip: "Verifica incrociata delle voci rispetto ai requisiti catastali prima dell'invio.", weight: 0.15 },
    ],
  },
  demoLogin: {
    title: "Accesso Demo",
    subtitle: "Accedi per visualizzare le demo interattive",
    personalizedTitle: "Accesso Demo per",
    authenticating: "Autenticazione...",
    signIn: "Accedi",
    clientOnly: "Accesso riservato ai clienti",
    platformName: "Piattaforma Demo Praxis AI",
    emailLabel: "Email",
    emailPlaceholder: "tu@tuostudio.it",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
  },
  demoHub: {
    title: "Demo AI per Studi Professionali",
    subtitle: "Dimostrazioni interattive delle nostre soluzioni AI su misura per la vostra professione",
    launchDemo: "Avvia la Demo",
    signOut: "Esci",
    recommendedBadge: "Consigliato per te",
    professionGroup: "Demo per Professione",
    admin: "Admin",
    otherGroup: "Altro",
    otherDemos: {
      klaviyoStrategist: {
        title: "Klaviyo AI Strategist",
        description: "Analisi campagne email, segmentazione audience e generazione strategie di marketing ottimizzate con intelligenza artificiale",
      },
      klaviyoOps: {
        title: "Klaviyo AI Ops",
        description: "Design e ottimizzazione template email, builder intelligente e automazione operativa per campagne Klaviyo",
      },
      shopifyStrategist: {
        title: "Shopify AI Strategist",
        description: "Analisi performance e-commerce, insights strategici e piani di crescita generati dall'AI per il tuo store Shopify",
      },
      shopifyOps: {
        title: "Shopify AI Ops",
        description: "Gestione ordini, inventario intelligente e automazione operativa per store Shopify con intelligenza artificiale",
      },
    },
  },
  admin: {
    title: "Richieste di Contatto",
    totalSubmissions: "Totale Richieste",
    newSubmissions: "Nuove (Non lette)",
    avgSavings: "Risparmio Medio Stimato",
    avgDemos: "Demo Completate (Media)",
    search: "Cerca per nome, email o azienda...",
    allStatuses: "Tutti gli Stati",
    allProfessions: "Tutte le Professioni",
    name: "Nome",
    email: "Email",
    company: "Azienda",
    profession: "Professione",
    estSavings: "Risparmio Stim.",
    status: "Stato",
    date: "Data",
    expand: "Dettagli",
    statusNew: "Nuovo",
    statusContacted: "Contattato",
    statusQualified: "Qualificato",
    statusConverted: "Convertito",
    statusArchived: "Archiviato",
    clients: "Clienti",
    weeklyHours: "Ore Ammin. Settimanali",
    hoursSaved: "Ore Risparmiate / Sett.",
    monthlySavings: "Risparmio Mensile",
    demosViewed: "Demo Visualizzate",
    demosCompleted: "Demo Completate",
    demoProgress: "Avanzamento",
    timeSpent: "Tempo Impiegato",
    profilingContext: "Contesto di Profilazione",
    noResults: "Nessuna richiesta corrisponde ai filtri.",
    perMonth: "/mese",
    demoEngagement: "Coinvolgimento Demo",
    demosLabel: "Demo",
    showing: "Mostrando",
    of: "di",
    collapse: "Comprimi",
  },
  demoViewer: {
    introOverlayTitle: "Cosa state per vedere",
    introOverlayCta: "Avvia la Demo",
    postDemoTitle: "Vi interessa?",
    postDemoCta: "Prenota una Consulenza",
    postDemoBack: "Torna alle Soluzioni",
  },
};
