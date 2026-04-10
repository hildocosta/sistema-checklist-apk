# 🛡️ Sistema de Checklist Digital - 17º BPM (Ecossistema Mobile & Web)

<p align="center">
  <img src="https://img.shields.io/badge/Expo_Router-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="PostgreSQL" />
</p>

<p align="center">
  <strong>A evolução da logística militar: Gestão estratégica na Web e execução tática na palma da mão.</strong>
</p>

---

## 📖 Sobre o Projeto: Ecossistema Integrado

O **Sistema de Checklist Digital do 17º BPM** evoluiu de uma ferramenta Web para um ecossistema completo. O projeto foi idealizado para sanar gargalos operacionais na **Reserva de Armas (Furrielação)**, substituindo formulários físicos por uma solução tecnológica que une a mobilidade do aplicativo à robustez da gestão via navegador.

### 🔄 Sincronia de Dados (Single Source of Truth)
O diferencial técnico desta solução é a utilização de um **Backend Unificado (Next.js API)** e o banco de dados **Neon Postgres**. 
* **Tempo Real:** Um checklist iniciado no pátio via Smartphone pelo Furriel é refletido instantaneamente no Dashboard do Comandante na Web.
* **Consistência:** A mesma regra de negócio que valida a conferência na Web é aplicada no aplicativo.

---

## 🏗️ Arquitetura de Acesso Segmentado

O sistema adota uma metodologia de **Níveis de Privilégio**, garantindo que cada militar acesse apenas o necessário para sua missão:

### 🖥️ Painel de Comando (Web)
* **Público:** Comandante, Chefia de Logística e Administradores.
* **Foco:** Visão macro, gestão de usuários, cadastro/exclusão de carga e auditoria de relatórios gerados.
* **Tecnologia:** Next.js 15, Recharts (Gráficos), Tailwind CSS.

### 📲 Terminal Tático (Mobile App)
* **Público:** Furriéis e Operadores de serviço.
* **Foco:** Agilidade e execução. O aplicativo oferece uma interface limpa com opções reduzidas:
  * **Conferência Digital:** Checklist otimizado para telas sensíveis ao toque.
  * **Dashboard Operacional:** Indicadores rápidos de prontidão do turno atual.
  * **Perfil e Segurança:** Autogestão de dados e troca de senha pelo próprio militar.
* **Tecnologia:** React Native, Expo Router, Lucide Icons.

---

## 🚀 Transformação Operacional

| Processo Antigo (Papel) | Nova Era Digital (App & Web) |
| :--- | :--- |
| 02 cópias impressas por turno. | **Zero papel.** Dados em nuvem. |
| Entrega física de documentos ao almoxarifado. | **Envio instantâneo** via PDF/E-mail automático. |
| Difícil consulta de históricos de avarias. | **Busca inteligente** e filtros por data/ID. |
| Conferência lenta e burocrática. | **Mobile-First:** Conferência no pátio em segundos. |

---

## 📩 Automação de Relatórios (SMTP Engine)

O sistema utiliza um motor de envio automático via **Nodemailer**, integrado diretamente às rotas serverless:
1. **Geração:** O PDF é gerado com layout oficial do 17º BPM.
2. **Disparo:** Ao finalizar no App, o sistema dispara o documento para o e-mail da Seção de Logística.
3. **Segurança:** Utilização de **Gmail App Passwords** e criptografia TLS para tráfego seguro dos relatórios operacionais.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend Web** | Next.js 15 / Tailwind CSS |
| **Mobile App** | React Native / Expo |
| **Backend / API** | Next.js API Routes (Serverless) |
| **Banco de Dados** | Neon Postgres (Drizzle/Prisma) |
| **Relatórios** | jsPDF / Nodemailer |
| **Iconografia** | Lucide React / Lucide Native |

---

## 👤 Desenvolvedor

**Hildo Costa** - *Software Developer*

<p align="left">
  <a href="https://www.linkedin.com/in/hildo-costa-b83812231/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:hyldo.costa@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
</p>
