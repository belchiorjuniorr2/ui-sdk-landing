import { useState } from "react"
import {
  CheckIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  StarIcon,
  XIcon,
} from "lucide-react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "@ui-sdk/react/combobox"
import {
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  DatePicker,
  DatePickerContent,
  DatePickerHint,
  DatePickerInput,
  DatePickerTrigger,
} from "@ui-sdk/react/date-picker"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@ui-sdk/react/field"
import { Input } from "@ui-sdk/react/input"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@ui-sdk/react/menu"
import { Rating, RatingItem } from "@ui-sdk/react/rating"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs"
import { CodeSnippet } from "./components/CodeSnippet"
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "./components/SearchField"
import "./App.css"

const roles = [
  { value: "viewer", label: "Leitor" },
  { value: "commenter", label: "Comentarista" },
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Administrador" },
]

const cities = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "bh", label: "Belo Horizonte" },
  { value: "cwb", label: "Curitiba" },
  { value: "poa", label: "Porto Alegre" },
  { value: "ssa", label: "Salvador" },
  { value: "for", label: "Fortaleza" },
  { value: "rec", label: "Recife" },
  { value: "bsb", label: "Brasília" },
  { value: "man", label: "Manaus" },
]

const installSnippet = `npm install @ui-sdk/react @ui-sdk/core
npx skills add vercel-labs/ui --skill ui-sdk`

const howSnippet = `import { definePrimitive } from "@ui-sdk/core"
import { createParts } from "@ui-sdk/react/primitive"

const muteButton = definePrimitive({
  name: "mute-button",
  state: () => ({ muted: false }),
  api: (context) => ({
    toggle: () =>
      context.store.set({ muted: !context.store.get().muted }),
  }),
  slots: (slot) => ({
    root: slot({
      attrs: (state) => ({
        type: "button",
        "aria-pressed": String(state.muted),
      }),
      press: ({ api }) => api.toggle(),
    }),
  }),
})

const { Root: MuteButton } = createParts(muteButton, { root: "button" })`

function SearchExample() {
  return (
    <div className="demo-block">
      <SearchField className="search-field">
        <SearchIcon className="search-icon" aria-hidden="true" size={18} />
        <SearchFieldInput
          placeholder="Buscar documentos…"
          aria-label="Buscar documentos"
          data-testid="search-input"
        />
        <SearchFieldClear aria-label="Limpar busca" data-testid="search-clear">
          Limpar
          <XIcon aria-hidden="true" size={14} />
        </SearchFieldClear>
      </SearchField>
      <p className="demo-status" data-testid="search-status">
        O botão Limpar só aparece com texto. Ao limpar, o foco volta ao campo.
      </p>
    </div>
  )
}

function SelectExample() {
  const [role, setRole] = useState<string | null>(null)

  return (
    <div className="demo-block">
      <Field>
        <FieldLabel>Função</FieldLabel>
        <Select
          placeholder="Selecione uma função"
          value={role}
          onValueChange={(value) => setRole(value as string | null)}
          presentation="auto"
        >
          <SelectTrigger data-testid="select-trigger">
            <SelectValue />
            <ChevronDownIcon aria-hidden="true" size={16} />
          </SelectTrigger>
          <SelectContent>
            {roles.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
                <SelectItemIndicator>
                  <CheckIcon aria-hidden="true" size={16} />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <p className="demo-status" data-testid="select-status">
        {role
          ? `Escolhido: ${roles.find((item) => item.value === role)?.label}`
          : "Abra a lista ou use as setas e Enter."}
      </p>
    </div>
  )
}

function ComboboxExample() {
  const [city, setCity] = useState<string | null>(null)

  return (
    <div className="demo-block">
      <Combobox
        value={city}
        onValueChange={(value) => setCity(value as string | null)}
        presentation="auto"
      >
        <ComboboxLabel>Cidade</ComboboxLabel>
        <div className="combo-row">
          <ComboboxInput placeholder="Buscar uma cidade…" />
          <ComboboxTrigger aria-label="Mostrar cidades">
            <ChevronDownIcon aria-hidden="true" size={16} />
          </ComboboxTrigger>
        </div>
        <ComboboxContent>
          <ComboboxEmpty>Nenhuma cidade encontrada.</ComboboxEmpty>
          <ComboboxList>
            {cities.map((item) => (
              <ComboboxItem
                key={item.value}
                value={item.value}
                label={item.label}
              >
                {item.label}
                <ComboboxItemIndicator>
                  <CheckIcon aria-hidden="true" size={16} />
                </ComboboxItemIndicator>
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="demo-status">
        {city
          ? `Cidade: ${cities.find((item) => item.value === city)?.label}`
          : "Digite “cur” para filtrar, use as setas e Enter para escolher."}
      </p>
    </div>
  )
}

function TabsExample() {
  return (
    <div className="demo-block">
      <Tabs defaultValue="conta">
        <TabsList aria-label="Seções da conta" data-testid="tabs-list">
          <TabsTab value="conta">Conta</TabsTab>
          <TabsTab value="seguranca">Segurança</TabsTab>
          <TabsTab value="preferencias">Preferências</TabsTab>
        </TabsList>
        <TabsPanel value="conta">
          Atualize nome, e-mail e foto de perfil. A equipe vê as mudanças na
          hora.
        </TabsPanel>
        <TabsPanel value="seguranca">
          Escolha uma senha nova e ative a autenticação em duas etapas.
        </TabsPanel>
        <TabsPanel value="preferencias">
          Defina idioma, fuso horário e a página inicial do painel.
        </TabsPanel>
      </Tabs>
    </div>
  )
}

function MenuExample() {
  const [action, setAction] = useState<string | null>(null)

  const labels: Record<string, string> = {
    rename: "Renomear",
    duplicate: "Duplicar",
    archive: "Arquivar",
    "export-pdf": "Exportar PDF",
    "export-csv": "Exportar CSV",
    delete: "Excluir",
  }

  return (
    <div className="demo-block">
      <Menu
        onAction={(value) => setAction(String(value))}
        presentation="auto"
      >
        <MenuTrigger>Ações</MenuTrigger>
        <MenuContent>
          <MenuItem value="rename">Renomear</MenuItem>
          <MenuItem value="duplicate">Duplicar</MenuItem>
          <MenuItem value="archive">Arquivar</MenuItem>
          <MenuSeparator />
          <MenuSub>
            <MenuSubTrigger>
              Exportar
              <ChevronRightIcon aria-hidden="true" size={16} />
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem value="export-pdf">PDF</MenuItem>
              <MenuItem value="export-csv">CSV</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuSeparator />
          <MenuItem value="delete">Excluir</MenuItem>
        </MenuContent>
      </Menu>
      <p className="demo-status">
        {action
          ? `Ação: ${labels[action] ?? action}`
          : "Abra o menu, navegue com as setas e confirme com Enter. Esc fecha."}
      </p>
    </div>
  )
}

function DatePickerExample() {
  const [date, setDate] = useState<string | null>("2026-11-13")

  return (
    <div className="demo-block">
      <DatePicker
        locale="pt-BR"
        weekStartsOn={0}
        value={date}
        onValueChange={(value) => setDate((value as string | null) ?? null)}
        presentation="auto"
      >
        <div className="date-row">
          <DatePickerInput aria-label="Data de vencimento" />
          <DatePickerTrigger aria-label="Abrir calendário">
            <CalendarIcon aria-hidden="true" size={16} />
          </DatePickerTrigger>
        </div>
        <DatePickerHint>
          {(state) => `Formato esperado, como ${state.example}`}
        </DatePickerHint>
        <DatePickerContent>
          <div className="date-row">
            <CalendarPrevious aria-label="Mês anterior">
              <ChevronLeftIcon aria-hidden="true" size={16} />
            </CalendarPrevious>
            <CalendarHeading />
            <CalendarNext aria-label="Próximo mês">
              <ChevronRightIcon aria-hidden="true" size={16} />
            </CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {(index) => <CalendarWeekday index={index} />}
            </CalendarWeekdays>
            <CalendarWeeks>
              {(cell) => <CalendarDay value={cell.date} />}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
      <p className="demo-status">
        {date ? `Data ISO: ${date}` : "Digite uma data ou escolha no calendário."}
      </p>
    </div>
  )
}

function FieldExample() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div className="demo-block">
      <form
        className="field-form"
        onSubmit={(event) => {
          event.preventDefault()
          const email = new FormData(event.currentTarget).get("email")
          setSubmitted(typeof email === "string" ? email : null)
        }}
      >
        <Field name="email">
          <FieldLabel>E-mail</FieldLabel>
          <Input
            type="email"
            required
            placeholder="voce@empresa.com"
            autoComplete="email"
          />
          <FieldDescription>
            Usamos este endereço só para enviar a confirmação.
          </FieldDescription>
          <FieldError match="valueMissing">
            Informe o seu endereço de e-mail.
          </FieldError>
          <FieldError match="typeMismatch">
            Digite um e-mail válido, como voce@empresa.com.
          </FieldError>
        </Field>
        <button type="submit" className="submit-button">
          Inscrever
        </button>
      </form>
      <p className="demo-status">
        {submitted
          ? `Inscrito: ${submitted}`
          : "Envie vazio ou com texto inválido para ver a validação."}
      </p>
    </div>
  )
}

function RatingExample() {
  const [score, setScore] = useState<number | null>(4)

  return (
    <div className="demo-block">
      <Rating
        aria-label="Avaliação da demo"
        value={score}
        deselectable
        onValueChange={(value) => setScore(value as number | null)}
        getValueLabel={(value, max) => `${value} de ${max} estrelas`}
      >
        <RatingItem>
          {({ fill }) => (
            <StarIcon
              aria-hidden="true"
              size={28}
              fill={fill === 1 ? "currentColor" : "none"}
            />
          )}
        </RatingItem>
      </Rating>
      <p className="demo-status">
        {score == null
          ? "Nenhuma estrela selecionada. Use as setas ou toque para avaliar."
          : `Nota: ${score} de 5`}
      </p>
    </div>
  )
}

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#topo">
          UI SDK <span>demo</span>
        </a>
        <nav className="topnav" aria-label="Seções">
          <a href="#como-funciona">Como funciona</a>
          <a href="#exemplos">Exemplos</a>
          <a href="https://ui-sdk.dev/docs" target="_blank" rel="noreferrer">
            Docs
          </a>
          <a
            href="https://github.com/vercel-labs/ui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main id="topo">
        <section className="hero">
          <p className="eyebrow">Vercel Labs · beta</p>
          <h1>
            Uma biblioteca de comportamentos para agentes montarem interfaces.
          </h1>
          <p className="lede">
            O UI SDK não é um kit de botões prontos. A lógica de teclado, foco,
            seleção, fechamento, popups, arrastar e soltar e a ARIA necessária
            vive no <code>@ui-sdk/core</code>. Os adaptadores renderizam as
            mesmas partes no React, Vue, Svelte, Solid e Web Components.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#exemplos">
              Ver exemplos ao vivo
            </a>
            <a
              className="button ghost"
              href="https://github.com/vercel-labs/ui"
              target="_blank"
              rel="noreferrer"
            >
              Repositório oficial
            </a>
          </div>
          <p className="disclaimer">
            Esta é uma demonstração não oficial, feita para explorar o SDK. Não
            é um site da Vercel. Créditos ao{" "}
            <a
              href="https://github.com/vercel-labs"
              target="_blank"
              rel="noreferrer"
            >
              Vercel Labs
            </a>
            . O projeto ainda está em beta e as APIs podem mudar.
          </p>
        </section>

        <section className="install" aria-labelledby="install-title">
          <div>
            <h2 id="install-title">Instalação</h2>
            <p>
              Instale o core e o adaptador do seu framework. Depois, entregue a
              skill do UI SDK ao agente.
            </p>
          </div>
          <CodeSnippet>{installSnippet}</CodeSnippet>
        </section>

        <section
          className="how"
          id="como-funciona"
          aria-labelledby="how-title"
        >
          <h2 id="how-title">Como funciona</h2>
          <ol className="steps">
            <li>
              <strong>definePrimitive</strong>
              <span>
                Descreve o comportamento uma vez: estado, API e slots (as
                partes). Não renderiza nada sozinho.
              </span>
            </li>
            <li>
              <strong>createParts</strong>
              <span>
                O adaptador do React (ou Vue, Svelte, Solid, Web Components)
                transforma cada slot em um componente. As partes são as mesmas
                nos cinco.
              </span>
            </li>
            <li>
              <strong>Você estiliza</strong>
              <span>
                Os componentes vêm sem CSS. O estado aparece em atributos como{" "}
                <code>data-open</code>, <code>data-pressed</code> e{" "}
                <code>aria-*</code>.
              </span>
            </li>
          </ol>
          <CodeSnippet>{howSnippet}</CodeSnippet>
        </section>

        <section className="examples" id="exemplos" aria-labelledby="ex-title">
          <div className="section-head">
            <h2 id="ex-title">Exemplos ao vivo</h2>
            <p>
              Todos os exemplos abaixo usam APIs reais do{" "}
              <code>@ui-sdk/react</code> e do <code>@ui-sdk/core</code>{" "}
              (0.1.0-beta.1). O campo de busca é um primitivo definido à mão,
              como no README; os demais usam os componentes prontos do pacote.
            </p>
          </div>

          <article className="example" id="busca">
            <header>
              <h3>Campo de busca</h3>
              <p>
                Primitivo customizado com <code>definePrimitive</code>,{" "}
                <code>createFocusRecovery</code> e <code>present</code>. O botão
                Limpar só existe enquanto há texto; ao pressionar, o foco volta
                ao input.
              </p>
              <ul className="tags">
                <li>definePrimitive</li>
                <li>createFocusRecovery</li>
                <li>present</li>
              </ul>
            </header>
            <SearchExample />
            <CodeSnippet>{`const searchField = definePrimitive({
  name: "search-field",
  state: () => ({ value: "" }),
  api: (context) => ({
    set: (value: string) => context.store.set({ value }),
    recovery: createFocusRecovery({
      fallback: () => context.element("input"),
    }),
  }),
  slots: (slot) => ({
    input: slot({
      attrs: (state) => ({ value: state.value }),
      on: {
        input: (event, { api }) =>
          api.set((event.target as HTMLInputElement).value),
      },
    }),
    clear: slot({
      present: (state) => state.value !== "",
      press: ({ api }) => api.set(""),
      bind: (el, part) => part.api.recovery.bind(el, part),
    }),
  }),
})`}</CodeSnippet>
          </article>

          <article className="example" id="select">
            <header>
              <h3>Select</h3>
              <p>
                Lista em popup com navegação por teclado, typeahead, indicador
                de item e fechamento automático. Em telas de toque pequenas,{" "}
                <code>presentation=&quot;auto&quot;</code> pode virar uma
                folha.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/select</li>
                <li>popup</li>
                <li>seleção</li>
              </ul>
            </header>
            <SelectExample />
            <CodeSnippet>{`<Select placeholder="Selecione uma função">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="editor">Editor</SelectItem>
  </SelectContent>
</Select>`}</CodeSnippet>
          </article>

          <article className="example" id="combobox">
            <header>
              <h3>Combobox</h3>
              <p>
                Busque e escolha um valor da lista. O texto é só a consulta; o
                valor enviado é a opção escolhida.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/combobox</li>
                <li>filtro</li>
                <li>listbox</li>
              </ul>
            </header>
            <ComboboxExample />
            <CodeSnippet>{`<Combobox>
  <ComboboxLabel>Cidade</ComboboxLabel>
  <ComboboxInput placeholder="Buscar uma cidade…" />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="cwb" label="Curitiba">
        Curitiba
      </ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}</CodeSnippet>
          </article>

          <article className="example" id="tabs">
            <header>
              <h3>Abas</h3>
              <p>
                Uma aba selecionada por vez. Tab entra na aba ativa; as setas,
                Home e End percorrem a lista.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/tabs</li>
                <li>roving focus</li>
                <li>ARIA tabs</li>
              </ul>
            </header>
            <TabsExample />
            <CodeSnippet>{`<Tabs defaultValue="conta">
  <TabsList aria-label="Seções da conta">
    <TabsTab value="conta">Conta</TabsTab>
    <TabsTab value="seguranca">Segurança</TabsTab>
  </TabsList>
  <TabsPanel value="conta">Atualize o perfil.</TabsPanel>
  <TabsPanel value="seguranca">Escolha uma senha nova.</TabsPanel>
</Tabs>`}</CodeSnippet>
          </article>

          <article className="example" id="menu">
            <header>
              <h3>Menu</h3>
              <p>
                Ações com submenu, separadores, typeahead e fechamento com Esc.
                O submenu abre com a seta para a direita.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/menu</li>
                <li>submenu</li>
                <li>dismissal</li>
              </ul>
            </header>
            <MenuExample />
            <CodeSnippet>{`<Menu onAction={(value) => console.log(value)}>
  <MenuTrigger>Ações</MenuTrigger>
  <MenuContent>
    <MenuItem value="rename">Renomear</MenuItem>
    <MenuSub>
      <MenuSubTrigger>Exportar</MenuSubTrigger>
      <MenuSubContent>
        <MenuItem value="export-pdf">PDF</MenuItem>
      </MenuSubContent>
    </MenuSub>
  </MenuContent>
</Menu>`}</CodeSnippet>
          </article>

          <article className="example" id="date-picker">
            <header>
              <h3>Date Picker</h3>
              <p>
                Digite a data no formato do idioma ou escolha no calendário. O
                valor recebido é uma string ISO, sem biblioteca de datas.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/date-picker</li>
                <li>locale pt-BR</li>
                <li>calendário</li>
              </ul>
            </header>
            <DatePickerExample />
            <CodeSnippet>{`<DatePicker locale="pt-BR" defaultValue="2026-11-13">
  <DatePickerInput aria-label="Data de vencimento" />
  <DatePickerTrigger>Abrir calendário</DatePickerTrigger>
  <DatePickerHint />
  <DatePickerContent />
</DatePicker>`}</CodeSnippet>
          </article>

          <article className="example" id="field">
            <header>
              <h3>Field com validação</h3>
              <p>
                O Field liga o controle ao rótulo, à descrição e aos erros, e
                cuida de <code>id</code>, <code>for</code> e{" "}
                <code>aria-describedby</code>. As mensagens aparecem depois da
                tentativa de envio.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/field</li>
                <li>@ui-sdk/react/input</li>
                <li>validação nativa</li>
              </ul>
            </header>
            <FieldExample />
            <CodeSnippet>{`<Field name="email">
  <FieldLabel>E-mail</FieldLabel>
  <Input type="email" required />
  <FieldError match="valueMissing">
    Informe o seu endereço de e-mail.
  </FieldError>
  <FieldError match="typeMismatch">
    Digite um e-mail válido.
  </FieldError>
</Field>`}</CodeSnippet>
          </article>

          <article className="example" id="rating">
            <header>
              <h3>Avaliação com estrelas</h3>
              <p>
                Componente pronto de rating: um grupo de rádios, um único tab
                stop e navegação pelas setas. <code>deselectable</code> permite
                limpar a nota.
              </p>
              <ul className="tags">
                <li>@ui-sdk/react/rating</li>
                <li>teclado</li>
                <li>ARIA radio</li>
              </ul>
            </header>
            <RatingExample />
            <CodeSnippet>{`<Rating aria-label="Avaliação da demo" defaultValue={4} deselectable>
  <RatingItem>
    {({ fill }) => (
      <StarIcon fill={fill === 1 ? "currentColor" : "none"} />
    )}
  </RatingItem>
</Rating>`}</CodeSnippet>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>
          Demo não oficial do{" "}
          <a href="https://ui-sdk.dev/docs" target="_blank" rel="noreferrer">
            UI SDK
          </a>
          , um projeto em beta do{" "}
          <a
            href="https://github.com/vercel-labs/ui"
            target="_blank"
            rel="noreferrer"
          >
            Vercel Labs
          </a>
          . Código desta página no repositório da demo.
        </p>
      </footer>
    </div>
  )
}

export default App
