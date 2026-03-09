export const BUTTON_VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"];
export const BUTTON_SIZES = ["sm", "md", "lg"];
export const ALERT_VARIANTS = ["info", "success", "warning", "danger"];
export const MODAL_SIZES = ["sm", "md", "lg", "xl"];
export const TOOLTIP_POSITIONS = ["top", "bottom", "left", "right"];
export const SPINNER_SIZES = ["sm", "md", "lg"];
export const BADGE_VARIANTS = ["neutral", "brand", "success", "warning", "danger"];
export const BADGE_SIZES = ["sm", "md", "lg"];
export const HEADING_SIZES = ["xs", "sm", "md", "lg", "xl", "display"];
export const HEADING_WEIGHTS = ["regular", "medium", "semibold", "bold"];
export const HEADING_ALIGNS = ["left", "center", "right", "justify"];
export const HEADING_TONES = ["default", "muted", "subtle", "brand", "danger", "success"];
export const TEXT_SIZES = ["xs", "sm", "md", "lg", "xl"];
export const TEXT_WEIGHTS = ["regular", "medium", "semibold", "bold"];
export const TEXT_TONES = ["default", "muted", "subtle", "brand", "danger", "success"];
export const LINK_TONES = ["default", "brand", "muted", "danger"];
export const LINK_UNDERLINES = ["hover", "always", "none"];
export const CONTAINER_MAX_WIDTHS = ["xs", "sm", "md", "lg", "xl", "full", "none"];
export const CONTAINER_PADDINGS = ["none", "sm", "md", "lg"];
export const GRID_GAPS = ["none", "sm", "md", "lg"];
export const STACK_DIRECTIONS = ["row", "column", "row-reverse", "column-reverse"];
export const STACK_GAPS = ["none", "sm", "md", "lg"];
export const CARD_PADDINGS = ["none", "sm", "md", "lg"];

const snippet = (strings, ...values) => String.raw({ raw: strings }, ...values).trim();

export const COMPONENT_GUIDES = {
  button: {
    whenToUse: "Use for primary and secondary actions that commit or cancel form-level changes.",
    recommendedFor: "SaaS admin forms, onboarding steps, and dashboard action bars.",
    layoutRecommendation: "Right-align action clusters and keep one clear primary button per section.",
    snippetTitle: "Form action row",
    snippetCode: snippet`
<Stack direction="row" gap="sm" justify="flex-end">
  <Button variant="ghost" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="primary" loading={isSaving} onClick={onSave}>
    Save changes
  </Button>
</Stack>
`,
    notes: "Avoid multiple primary actions in the same visual group.",
  },
  "icon-button": {
    whenToUse: "Use for compact actions where the icon meaning is obvious and frequent.",
    recommendedFor: "Toolbar controls, table row actions, and dense dashboard headers.",
    layoutRecommendation: "Keep icon buttons in utility zones and add spacing from destructive controls.",
    snippetTitle: "Toolbar utility action",
    snippetCode: snippet`
<IconButton
  variant="ghost"
  ariaLabel="Open notifications panel"
  onClick={() => setPanelOpen(true)}
>
  N
</IconButton>
`,
    notes: "Always provide `ariaLabel` so screen readers can describe the action.",
  },
  alert: {
    whenToUse: "Use for status messages that should stay visible inline with page content.",
    recommendedFor: "Billing warnings, save confirmations, and inline error communication.",
    layoutRecommendation: "Place alerts near the affected content, above forms or below section headings.",
    snippetTitle: "Inline warning message",
    snippetCode: snippet`
<Alert variant="warning" title="Action required" dismissible>
  Your billing method expires in 3 days.
</Alert>
`,
    notes: "Prefer concise titles and one clear next step in alert body copy.",
  },
  modal: {
    whenToUse: "Use for focused tasks that require dedicated attention before returning to the page.",
    recommendedFor: "Invite flows, confirmation dialogs, and quick edit workflows in admin apps.",
    layoutRecommendation: "Keep modal forms short and disable overlay-close for high-stakes edits.",
    snippetTitle: "Invite teammate modal",
    snippetCode: snippet`
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Invite teammate"
  size="md"
  closeOnOverlayClick={false}
>
  <InviteForm />
</Modal>
`,
    notes: "Use explicit close/confirm actions for predictable task completion.",
  },
  spinner: {
    whenToUse: "Use during short async work when content is not yet ready to render.",
    recommendedFor: "Data fetch states, sync indicators, and button-level loading feedback.",
    layoutRecommendation: "Use inline spinners inside text rows and block spinners for panel-level loading.",
    snippetTitle: "Inline loading indicator",
    snippetCode: snippet`
<Stack direction="row" gap="sm" align="center">
  <Spinner inline size="sm" label="Loading transactions" />
  <Text tone="muted">Syncing latest transactions...</Text>
</Stack>
`,
    notes: "Always provide an accessible `label` that describes what is loading.",
  },
  tooltip: {
    whenToUse: "Use for short helper text that clarifies controls without consuming layout space.",
    recommendedFor: "Icon-only actions, compact tables, and dense admin toolbars.",
    layoutRecommendation: "Attach tooltips to actionable controls, not to large text paragraphs.",
    snippetTitle: "Icon help tooltip",
    snippetCode: snippet`
<Tooltip content="Edit workspace settings" position="right">
  <IconButton ariaLabel="Edit workspace" variant="outline">
    E
  </IconButton>
</Tooltip>
`,
    notes: "Tooltips should supplement labels, not replace critical instructions.",
  },
  "text-input": {
    whenToUse: "Use for short, single-line text values such as names, IDs, and amounts.",
    recommendedFor: "Settings forms, profile fields, and configuration screens.",
    layoutRecommendation: "Stack label, field, and helper text vertically for scanability on small screens.",
    snippetTitle: "Required settings input",
    snippetCode: snippet`
<TextInput
  label="Workspace name"
  placeholder="Acme Finance"
  helperText="Shown in sidebar and invoices."
  required
/>
`,
    notes: "Use helper text for format guidance and reserve errors for validation failures.",
  },
  "text-area": {
    whenToUse: "Use for multi-line descriptions, notes, and rationale fields.",
    recommendedFor: "Internal admin notes, ticket context, and approval comments.",
    layoutRecommendation: "Prefer vertical resize and full-width placement within form cards.",
    snippetTitle: "Internal note field",
    snippetCode: snippet`
<TextArea
  label="Internal note"
  placeholder="Add rollout notes for the ops team..."
  resize="vertical"
  helperText="Visible to workspace admins only."
/>
`,
    notes: "Cap line length with container width to keep long notes readable.",
  },
  select: {
    whenToUse: "Use when users choose one option from a finite known set.",
    recommendedFor: "Plan selection, report filters, and workspace defaults.",
    layoutRecommendation: "Place related selects in a compact filter row with consistent widths.",
    snippetTitle: "Dashboard filter select",
    snippetCode: snippet`
<Select
  label="Default report range"
  value={range}
  onChange={(event) => setRange(event.target.value)}
  options={[
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Quarter to date", value: "qtd" },
  ]}
/>
`,
    notes: "Use placeholders only when no safe default exists.",
  },
  checkbox: {
    whenToUse: "Use for independent yes/no preferences that can be toggled freely.",
    recommendedFor: "Notification settings, feature flags, and consent options.",
    layoutRecommendation: "Group related checkboxes in vertical stacks with helper text under each label.",
    snippetTitle: "Notification preference toggle",
    snippetCode: snippet`
<Checkbox
  label="Send weekly summary email"
  helperText="Monday at 9:00 AM in workspace timezone."
  defaultChecked
/>
`,
    notes: "Prefer positive labels so checked state clearly means enabled.",
  },
  "radio-button": {
    whenToUse: "Use when users must choose exactly one option from a small set.",
    recommendedFor: "Billing cadence, export format, and mode selection in settings.",
    layoutRecommendation: "Keep options in one visual group with the same `name` value.",
    snippetTitle: "Billing cycle choice",
    snippetCode: snippet`
<Stack direction="row" gap="sm" wrap>
  <RadioButton label="Monthly billing" name="billing" value="monthly" defaultChecked />
  <RadioButton label="Yearly billing" name="billing" value="yearly" />
</Stack>
`,
    notes: "Prefer radio buttons when all options should be visible without opening a dropdown.",
  },
  container: {
    whenToUse: "Use to enforce readable page widths and consistent horizontal padding.",
    recommendedFor: "Dashboard pages, settings screens, and content-heavy admin views.",
    layoutRecommendation: "Use one page-level container and nest layout primitives inside it.",
    snippetTitle: "Page-level container",
    snippetCode: snippet`
<Container maxWidth="xl" padding="lg">
  <DashboardOverview />
</Container>
`,
    notes: "Choose `maxWidth` based on content density rather than screen size alone.",
  },
  grid: {
    whenToUse: "Use for card collections and metric panels that should align in rows/columns.",
    recommendedFor: "Analytics dashboards, KPI overviews, and comparison layouts.",
    layoutRecommendation: "Use `autoFit` with a min column width to avoid custom breakpoint logic.",
    snippetTitle: "Responsive KPI grid",
    snippetCode: snippet`
<Grid autoFit minColumnWidth="18rem" gap="md">
  <Card bordered><RevenueCard /></Card>
  <Card bordered><CashflowCard /></Card>
  <Card bordered><BudgetCard /></Card>
</Grid>
`,
    notes: "Keep card heights flexible and let content determine vertical rhythm.",
  },
  stack: {
    whenToUse: "Use for one-dimensional spacing between related UI elements.",
    recommendedFor: "Form sections, card internals, and header/action composition.",
    layoutRecommendation: "Default to vertical stacks and introduce horizontal direction only for action rows.",
    snippetTitle: "Section composition stack",
    snippetCode: snippet`
<Stack gap="md">
  <Heading as="h2" size="md">Team activity</Heading>
  <ActivityTable />
  <Button variant="outline">Export CSV</Button>
</Stack>
`,
    notes: "Treat `Stack` as the default spacing primitive before custom margins.",
  },
  card: {
    whenToUse: "Use to group related data and actions on a shared visual surface.",
    recommendedFor: "Plan summaries, account cards, and dashboard widgets.",
    layoutRecommendation: "Use bordered cards in dense grids and elevated cards for priority callouts.",
    snippetTitle: "Summary card with actions",
    snippetCode: snippet`
<Card
  bordered
  elevated
  header={<Heading as="h3" size="sm">Plan summary</Heading>}
  footer={<Button size="sm">Manage plan</Button>}
>
  <Text tone="muted">Professional plan renews on March 31.</Text>
</Card>
`,
    notes: "Keep card padding consistent across sibling cards in the same grid.",
  },
  navbar: {
    whenToUse: "Use as the global top-level navigation for product areas and key actions.",
    recommendedFor: "Multi-page SaaS products and admin portals with persistent navigation.",
    layoutRecommendation: "Use sticky navbar for long-scroll pages and keep action area minimal.",
    snippetTitle: "Admin top navigation",
    snippetCode: snippet`
<Navbar
  sticky
  brand="Nyro Admin"
  items={[
    { label: "Overview", href: "/overview", active: true },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ]}
  actions={<Button size="sm">New report</Button>}
/>
`,
    notes: "Keep top-nav labels short so mobile collapse remains readable.",
  },
  sidebar: {
    whenToUse: "Use for dense section navigation and role-based app modules.",
    recommendedFor: "Finance/admin workspaces with many persistent navigation destinations.",
    layoutRecommendation: "Place sidebar beside main content and keep collapse state consistent per user.",
    snippetTitle: "Workspace sidebar navigation",
    snippetCode: snippet`
<Sidebar
  title="Workspace"
  items={[
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Transactions", href: "/transactions" },
    { label: "Budgets", href: "/budgets" },
  ]}
  defaultCollapsed={false}
/>
`,
    notes: "Reserve right-side sidebars for context tools, not primary navigation.",
  },
  breadcrumb: {
    whenToUse: "Use to show location depth when users can enter pages from multiple routes.",
    recommendedFor: "Settings hierarchies, billing detail pages, and admin sub-routes.",
    layoutRecommendation: "Place breadcrumbs above page headings with clear hierarchy progression.",
    snippetTitle: "Nested route breadcrumb",
    snippetCode: snippet`
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Billing", href: "/billing" },
    { label: "Invoices", current: true },
  ]}
/>
`,
    notes: "Do not use breadcrumbs as a replacement for primary navigation.",
  },
  pagination: {
    whenToUse: "Use for large datasets where page count and position need explicit control.",
    recommendedFor: "Transaction tables, user lists, and activity logs in admin apps.",
    layoutRecommendation: "Right-align pagination beneath data tables and keep siblingCount low on mobile.",
    snippetTitle: "Paginated data table footer",
    snippetCode: snippet`
<Pagination
  currentPage={page}
  totalPages={totalPages}
  siblingCount={1}
  onPageChange={setPage}
/>
`,
    notes: "Pair pagination with page-size and filter controls for faster dataset navigation.",
  },
  heading: {
    whenToUse: "Use for semantic hierarchy and clear section structure across long pages.",
    recommendedFor: "Dashboard pages, settings modules, and report sections.",
    layoutRecommendation: "Use one `h1` per page and step down heading levels without skipping.",
    snippetTitle: "Page heading pattern",
    snippetCode: snippet`
<Heading as="h1" size="lg" weight="bold">
  Revenue dashboard
</Heading>
`,
    notes: "Keep headings task-oriented so users can scan quickly.",
  },
  text: {
    whenToUse: "Use for body copy, helper text, and metadata labels around core UI.",
    recommendedFor: "Supportive descriptions in cards, forms, and table rows.",
    layoutRecommendation: "Use muted text for secondary information and maintain consistent spacing from labels.",
    snippetTitle: "Secondary metadata text",
    snippetCode: snippet`
<Text size="sm" tone="muted">
  Last synced 2 minutes ago from connected bank feeds.
</Text>
`,
    notes: "Keep long-form body text in medium-width containers for readability.",
  },
  badge: {
    whenToUse: "Use for compact status labeling and categorical tagging.",
    recommendedFor: "Plan status, payment state, and risk labels in dashboards.",
    layoutRecommendation: "Place badges adjacent to headings or table values, not as standalone blocks.",
    snippetTitle: "Status badge",
    snippetCode: snippet`
<Badge variant="success" pill>
  Active
</Badge>
`,
    notes: "Limit the number of badge colors on one screen to reduce cognitive load.",
  },
  link: {
    whenToUse: "Use for navigation and lightweight actions that should look text-first.",
    recommendedFor: "Settings shortcuts, inline docs links, and table detail navigation.",
    layoutRecommendation: "Keep links inline with related text and use brand tone for key paths.",
    snippetTitle: "Inline settings link",
    snippetCode: snippet`
<UiLink href="/settings/billing" tone="brand" underline="hover">
  Manage billing settings
</UiLink>
`,
    notes: "Use descriptive link text instead of generic labels like 'Click here'.",
  },
  "auth-login-form": {
    whenToUse: "Use for workspace authentication screens that require email/password plus quick recovery links.",
    recommendedFor: "SaaS admin portals, internal finance tools, and B2B account dashboards.",
    layoutRecommendation: "Center within a constrained container and keep auth actions grouped directly below fields.",
    snippetTitle: "Full AuthLoginForm component",
    snippetCode: snippet`
function WorkspaceLoginPattern({ onSubmit, loading, error }) {
  return (
    <AuthLoginForm
      state={loading ? "loading" : error ? "error" : "default"}
      title="Sign in to Nyro Admin"
      subtitle="Use your workspace credentials to continue."
      onSubmit={onSubmit}
      onForgotPassword={() => openResetFlow()}
      onCreateAccount={() => openInviteFlow()}
    />
  );
}
`,
    secondarySnippetTitle: "AuthLoginForm usage",
    secondarySnippetCode: snippet`
<AuthLoginForm
  onSubmit={(values) => login(values.email, values.password)}
  state={authPending ? "loading" : authError ? "error" : "default"}
/>
`,
    notes: "Pair with AuthPasswordResetForm for complete account-access coverage.",
  },
  "auth-password-reset-form": {
    whenToUse: "Use for password recovery and account-unlock workflows.",
    recommendedFor: "Login adjacencies in SaaS/account portals with email-based reset flows.",
    layoutRecommendation: "Place near login routes with clear return-to-login action.",
    snippetTitle: "Full AuthPasswordResetForm component",
    snippetCode: snippet`
function PasswordResetPattern({ submitReset, loading, error, success }) {
  return (
    <AuthPasswordResetForm
      state={loading ? "loading" : error ? "error" : "default"}
      showSuccess={success}
      onSubmit={({ email }) => submitReset(email)}
      onBackToLogin={() => navigate("/login")}
    />
  );
}
`,
    secondarySnippetTitle: "AuthPasswordResetForm usage",
    secondarySnippetCode: snippet`
<AuthPasswordResetForm
  showSuccess={resetSent}
  state={submitting ? "loading" : submitError ? "error" : "default"}
  onSubmit={({ email }) => requestPasswordReset(email)}
/>
`,
    notes: "Show success state even if account existence is unknown for safer auth UX.",
  },
  "app-header-bar": {
    whenToUse: "Use as top-level app navigation with utility actions and status context.",
    recommendedFor: "Multi-route SaaS/admin experiences with persistent top navigation.",
    layoutRecommendation: "Keep nav labels short and surface one primary action to reduce header noise.",
    snippetTitle: "Full AppHeaderBar component",
    snippetCode: snippet`
function WorkspaceHeaderPattern() {
  return (
    <AppHeaderBar
      brand="Nyro Finance"
      items={[
        { label: "Overview", href: "/overview", active: true },
        { label: "Reports", href: "/reports" },
        { label: "Settings", href: "/settings" },
      ]}
      onPrimaryAction={() => openNewReport()}
      onUserAction={() => toggleUserMenu()}
    />
  );
}
`,
    secondarySnippetTitle: "AppHeaderBar usage",
    secondarySnippetCode: snippet`
<AppHeaderBar
  variant="compact"
  sticky
  onPrimaryAction={() => openCreateModal()}
/>
`,
    notes: "Combine with AppSidebarShell for complete application chrome.",
  },
  "app-sidebar-shell": {
    whenToUse: "Use for workspace layouts that need persistent side navigation and contextual page body.",
    recommendedFor: "Admin workspaces, operations dashboards, and role-based internal tools.",
    layoutRecommendation: "Keep shell wrapper full-width and drive page sections inside the content region.",
    snippetTitle: "Full AppSidebarShell component",
    snippetCode: snippet`
function WorkspaceShellPattern({ children }) {
  return (
    <AppSidebarShell
      title="Workspace"
      headerTitle="Operations"
      sidebarItems={[
        { label: "Dashboard", href: "/dashboard", active: true, icon: "DB" },
        { label: "Transactions", href: "/transactions", icon: "TX" },
        { label: "Budgets", href: "/budgets", icon: "BG" },
      ]}
      headerActions={<Button size="sm">Create item</Button>}
    >
      {children}
    </AppSidebarShell>
  );
}
`,
    secondarySnippetTitle: "AppSidebarShell usage",
    secondarySnippetCode: snippet`
<AppSidebarShell defaultCollapsed>
  <DataTablePanel />
</AppSidebarShell>
`,
    notes: "Persist collapse preference by user to improve repeat-session ergonomics.",
  },
  "page-header-actions": {
    whenToUse: "Use as the top block of data pages requiring title, context, and quick actions.",
    recommendedFor: "Dashboard subpages, report screens, and list/detail headers.",
    layoutRecommendation: "Keep one primary button and one support action beside title metadata.",
    snippetTitle: "Full PageHeaderActions component",
    snippetCode: snippet`
function TransactionsPageHeader({ loading, empty }) {
  return (
    <PageHeaderActions
      title="Transactions"
      subtitle="Monitor inflow, outflow, and reconciliation status."
      badgeLabel="Updated just now"
      state={loading ? "loading" : empty ? "empty" : "default"}
      onPrimaryAction={() => openCreateTransaction()}
      onSecondaryAction={() => exportTransactions()}
    />
  );
}
`,
    secondarySnippetTitle: "PageHeaderActions usage",
    secondarySnippetCode: snippet`
<PageHeaderActions
  state={loading ? "loading" : "default"}
  onPrimaryAction={() => openCreateModal()}
/>
`,
    notes: "Pair with FilterToolbar directly below for cohesive list-page composition.",
  },
  "filter-toolbar": {
    whenToUse: "Use above tables and dashboards where users refine result sets frequently.",
    recommendedFor: "Transaction lists, invoice views, and reporting interfaces.",
    layoutRecommendation: "Place directly under page header and keep controls aligned in one responsive row.",
    snippetTitle: "Full FilterToolbar component",
    snippetCode: snippet`
function TransactionsFilterPattern({ filters, updateFilters, apply, clear, loading }) {
  return (
    <FilterToolbar
      state={loading ? "loading" : "default"}
      searchValue={filters.search}
      statusValue={filters.status}
      onSearchChange={(value) => updateFilters({ ...filters, search: value })}
      onStatusChange={(value) => updateFilters({ ...filters, status: value })}
      onApplyFilters={apply}
      onClearFilters={clear}
      dateSlot={<Text tone="muted">Last 90 days</Text>}
    />
  );
}
`,
    secondarySnippetTitle: "FilterToolbar usage",
    secondarySnippetCode: snippet`
<FilterToolbar
  state={pending ? "loading" : "default"}
  onApplyFilters={({ search, status }) => fetchRows({ search, status })}
/>
`,
    notes: "Favor explicit Apply/Clear actions when filters are expensive to evaluate.",
  },
  "data-table-panel": {
    whenToUse: "Use for structured records with summary info, utility actions, and pagination controls.",
    recommendedFor: "Invoices, users, transactions, and audit trails.",
    layoutRecommendation: "Position beneath page header/filter controls and reserve horizontal space for columns.",
    snippetTitle: "Full DataTablePanel component",
    snippetCode: snippet`
function InvoiceTablePattern({ rows, page, setPage, loading }) {
  return (
    <DataTablePanel
      title="Invoices"
      summary={\`\${rows.length} invoices loaded\`}
      columns={[
        { key: "invoice", label: "Invoice" },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status" },
        { key: "amount", label: "Amount" },
      ]}
      rows={rows}
      currentPage={page}
      totalPages={12}
      state={loading ? "loading" : rows.length === 0 ? "empty" : "default"}
      onPageChange={setPage}
    />
  );
}
`,
    secondarySnippetTitle: "DataTablePanel usage",
    secondarySnippetCode: snippet`
<DataTablePanel
  rows={invoiceRows}
  state={loading ? "loading" : invoiceRows.length ? "default" : "empty"}
  onPageChange={setPage}
/>
`,
    notes: "When columns become dense, pair with horizontal scroll and filter presets.",
  },
  "empty-state-panel": {
    whenToUse: "Use when a section has no data yet and needs clear next-step actions.",
    recommendedFor: "First-run dashboards, empty lists, and onboarding checkpoints.",
    layoutRecommendation: "Use generous vertical spacing and one prominent CTA with optional secondary link.",
    snippetTitle: "Full EmptyStatePanel component",
    snippetCode: snippet`
function FirstRunEmptyPattern() {
  return (
    <EmptyStatePanel
      title="No transactions yet"
      description="Import your first statement to begin cashflow tracking."
      primaryActionLabel="Import statement"
      secondaryActionLabel="View setup guide"
      onPrimaryAction={() => openImport()}
      onSecondaryAction={() => openDocs()}
    />
  );
}
`,
    secondarySnippetTitle: "EmptyStatePanel usage",
    secondarySnippetCode: snippet`
<EmptyStatePanel
  state={loading ? "loading" : "empty"}
  primaryActionLabel="Create first item"
/>
`,
    notes: "Keep copy outcome-focused: what users gain after taking the action.",
  },
  "error-state-panel": {
    whenToUse: "Use for failed network or processing states that need immediate user recovery options.",
    recommendedFor: "Data panels, report loaders, and route-level error boundaries.",
    layoutRecommendation: "Keep retry action visible near the failure message and include support escalation link.",
    snippetTitle: "Full ErrorStatePanel component",
    snippetCode: snippet`
function FailureStatePattern({ retrying, retry }) {
  return (
    <ErrorStatePanel
      state={retrying ? "loading" : "error"}
      title="Unable to fetch transactions"
      description="Please retry or contact support if this persists."
      supportHref="/support"
      onRetry={retry}
    />
  );
}
`,
    secondarySnippetTitle: "ErrorStatePanel usage",
    secondarySnippetCode: snippet`
<ErrorStatePanel
  state={retryPending ? "loading" : "error"}
  onRetry={() => refetch()}
/>
`,
    notes: "Avoid blame-oriented copy and always provide a concrete recovery path.",
  },
  "settings-form-card": {
    whenToUse: "Use for grouped settings edits with clear save/cancel boundaries.",
    recommendedFor: "Workspace settings, billing preferences, and notification configuration screens.",
    layoutRecommendation: "Structure into short sections with helper copy and keep action row pinned at the bottom.",
    snippetTitle: "Full SettingsFormCard component",
    snippetCode: snippet`
function WorkspaceSettingsPattern({ saving, save, cancel }) {
  return (
    <SettingsFormCard
      state={saving ? "loading" : "default"}
      onSubmit={save}
      onCancel={cancel}
    >
      <section className="ui-pattern-settings__section">
        <h4>General</h4>
        <TextInput name="workspaceName" label="Workspace name" required />
      </section>
      <section className="ui-pattern-settings__section">
        <h4>Notifications</h4>
        <Checkbox name="weeklySummary" label="Send weekly summary" defaultChecked />
      </section>
    </SettingsFormCard>
  );
}
`,
    secondarySnippetTitle: "SettingsFormCard usage",
    secondarySnippetCode: snippet`
<SettingsFormCard
  state={savePending ? "loading" : saveError ? "error" : "default"}
  onSubmit={(values) => updateSettings(values)}
/>
`,
    notes: "Keep sections independent so validation errors map to specific blocks.",
  },
  "billing-plan-card": {
    whenToUse: "Use for account plan summaries with upgrade/manage controls.",
    recommendedFor: "Billing hubs, subscription overview pages, and account settings.",
    layoutRecommendation: "Place near invoices and payment methods so plan context stays visible.",
    snippetTitle: "Full BillingPlanCard component",
    snippetCode: snippet`
function AccountPlanPattern({ loading, empty, onUpgrade, onManage }) {
  return (
    <BillingPlanCard
      state={loading ? "loading" : empty ? "empty" : "default"}
      planName="Professional"
      statusLabel="Active"
      price="$49"
      billingCycle="per workspace / month"
      onPrimaryAction={onUpgrade}
      onSecondaryAction={onManage}
    />
  );
}
`,
    secondarySnippetTitle: "BillingPlanCard usage",
    secondarySnippetCode: snippet`
<BillingPlanCard
  state={planPending ? "loading" : activePlan ? "default" : "empty"}
  onPrimaryAction={() => openUpgrade()}
/>
`,
    notes: "Highlight renewal cadence and plan status to reduce billing confusion.",
  },
  "profile-summary-card": {
    whenToUse: "Use for member/account snapshots with identity, role, and quick metadata.",
    recommendedFor: "Admin user management, profile side panels, and account overviews.",
    layoutRecommendation: "Position beside settings forms or detail views for fast context switching.",
    snippetTitle: "Full ProfileSummaryCard component",
    snippetCode: snippet`
function UserProfilePattern({ profile, loading, onEdit }) {
  return (
    <ProfileSummaryCard
      state={loading ? "loading" : profile ? "default" : "empty"}
      name={profile?.name}
      email={profile?.email}
      role={profile?.role}
      meta={[
        { label: "Team", value: profile?.team || "-" },
        { label: "Last active", value: profile?.lastActive || "-" },
      ]}
      onEdit={onEdit}
    />
  );
}
`,
    secondarySnippetTitle: "ProfileSummaryCard usage",
    secondarySnippetCode: snippet`
<ProfileSummaryCard
  state={loading ? "loading" : user ? "default" : "empty"}
  onEdit={() => openEditProfile()}
/>
`,
    notes: "Use concise metadata labels so profile cards remain scannable in side panels.",
  },
};

export const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "#", icon: "DB", active: true },
  { label: "Transactions", href: "#", icon: "TX" },
  { label: "Budgets", href: "#", icon: "BG" },
  { label: "Settings", href: "#", icon: "ST" },
];

export const CATALOG_GROUPS = [
  {
    id: "buttons",
    title: "Buttons",
    description: "Action controls with visual hierarchy, sizing, and utility patterns.",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "IconButton" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Status messaging, progressive loading, overlays, and helper callouts.",
    items: [
      { id: "alert", label: "Alert" },
      { id: "modal", label: "Modal" },
      { id: "spinner", label: "Spinner" },
      { id: "tooltip", label: "Tooltip" },
    ],
  },
  {
    id: "inputs",
    title: "Inputs",
    description: "Form controls with helper text, validation feedback, and state coverage.",
    items: [
      { id: "text-input", label: "TextInput" },
      { id: "text-area", label: "TextArea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio-button", label: "RadioButton" },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    description: "Composition primitives for spacing, width constraints, and card surfaces.",
    items: [
      { id: "container", label: "Container" },
      { id: "grid", label: "Grid" },
      { id: "stack", label: "Stack" },
      { id: "card", label: "Card" },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Orientation, wayfinding, and page transition controls.",
    items: [
      { id: "navbar", label: "Navbar" },
      { id: "sidebar", label: "Sidebar" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "pagination", label: "Pagination" },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text hierarchy, inline status, and hyperlink presentation.",
    items: [
      { id: "heading", label: "Heading" },
      { id: "text", label: "Text" },
      { id: "badge", label: "Badge" },
      { id: "link", label: "Link" },
    ],
  },
  {
    id: "patterns",
    title: "Patterns",
    description: "Composed, reusable SaaS/admin building blocks for high-speed implementation.",
    items: [
      { id: "auth-login-form", label: "AuthLoginForm" },
      { id: "auth-password-reset-form", label: "AuthPasswordResetForm" },
      { id: "app-header-bar", label: "AppHeaderBar" },
      { id: "app-sidebar-shell", label: "AppSidebarShell" },
      { id: "page-header-actions", label: "PageHeaderActions" },
      { id: "filter-toolbar", label: "FilterToolbar" },
      { id: "data-table-panel", label: "DataTablePanel" },
      { id: "empty-state-panel", label: "EmptyStatePanel" },
      { id: "error-state-panel", label: "ErrorStatePanel" },
      { id: "settings-form-card", label: "SettingsFormCard" },
      { id: "billing-plan-card", label: "BillingPlanCard" },
      { id: "profile-summary-card", label: "ProfileSummaryCard" },
    ],
  },
];

export const NAV_ITEMS = CATALOG_GROUPS.map((group, index) => ({
  label: group.title,
  href: `#${group.id}`,
  active: index === 0,
}));

export const BREADCRUMB_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Nyro UI", href: "#" },
  { label: "Component catalog", current: true },
];

export const MODAL_BEHAVIORS = [
  {
    label: "Modal behavior: overlay on / esc on",
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
  {
    label: "Modal behavior: overlay off / esc on",
    closeOnOverlayClick: false,
    closeOnEsc: true,
  },
  {
    label: "Modal behavior: overlay on / esc off",
    closeOnOverlayClick: true,
    closeOnEsc: false,
  },
  {
    label: "Modal behavior: overlay off / esc off",
    closeOnOverlayClick: false,
    closeOnEsc: false,
  },
];
