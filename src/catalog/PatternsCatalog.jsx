import { useState } from "react";
import { Button, Stack, Text } from "../../ui-components";
import {
  AppHeaderBar,
  AppSidebarShell,
  AuthLoginForm,
  AuthPasswordResetForm,
  BillingPlanCard,
  DataTablePanel,
  EmptyStatePanel,
  ErrorStatePanel,
  FilterToolbar,
  PageHeaderActions,
  ProfileSummaryCard,
  SettingsFormCard,
} from "../../ui-components/patterns";
import { CatalogGroup, ComponentSection, DemoItem, DemoMatrix } from "./CatalogParts";

export default function PatternsCatalog() {
  const [tablePage, setTablePage] = useState(2);
  const [searchValue, setSearchValue] = useState("revenue");
  const [statusValue, setStatusValue] = useState("submitted");

  return (
    <CatalogGroup
      id="patterns"
      title="Patterns"
      description="Composed SaaS/admin components built from primitives for faster copy-paste implementation."
    >
      <ComponentSection
        id="auth-login-form"
        title="AuthLoginForm"
        description="Email/password login pattern with remember-me and loading/error support."
      >
        <DemoMatrix title="AuthLoginForm variants" singleColumn>
          <DemoItem label="AuthLoginForm variant: standard">
            <div className="app-pattern-form">
              <AuthLoginForm />
            </div>
          </DemoItem>
          <DemoItem label="AuthLoginForm variant: compact">
            <div className="app-pattern-form">
              <AuthLoginForm variant="compact" />
            </div>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="AuthLoginForm states" singleColumn>
          <DemoItem label="AuthLoginForm state: default">
            <div className="app-pattern-form">
              <AuthLoginForm state="default" />
            </div>
          </DemoItem>
          <DemoItem label="AuthLoginForm state: loading">
            <div className="app-pattern-form">
              <AuthLoginForm state="loading" />
            </div>
          </DemoItem>
          <DemoItem label="AuthLoginForm state: error">
            <div className="app-pattern-form">
              <AuthLoginForm state="error" />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="auth-password-reset-form"
        title="AuthPasswordResetForm"
        description="Password reset pattern with request submission and success/error feedback."
      >
        <DemoMatrix title="AuthPasswordResetForm variants" singleColumn>
          <DemoItem label="AuthPasswordResetForm variant: standard">
            <div className="app-pattern-form">
              <AuthPasswordResetForm showSuccess />
            </div>
          </DemoItem>
          <DemoItem label="AuthPasswordResetForm variant: compact">
            <div className="app-pattern-form">
              <AuthPasswordResetForm variant="compact" showSuccess />
            </div>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="AuthPasswordResetForm states" singleColumn>
          <DemoItem label="AuthPasswordResetForm state: default">
            <div className="app-pattern-form">
              <AuthPasswordResetForm state="default" />
            </div>
          </DemoItem>
          <DemoItem label="AuthPasswordResetForm state: loading">
            <div className="app-pattern-form">
              <AuthPasswordResetForm state="loading" />
            </div>
          </DemoItem>
          <DemoItem label="AuthPasswordResetForm state: error">
            <div className="app-pattern-form">
              <AuthPasswordResetForm state="error" />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="app-header-bar"
        title="AppHeaderBar"
        description="Global app header with navigation links, status badge, and utility actions."
      >
        <DemoMatrix title="AppHeaderBar variants" singleColumn>
          <DemoItem label="AppHeaderBar variant: standard">
            <div className="app-nav-preview">
              <AppHeaderBar />
            </div>
          </DemoItem>
          <DemoItem label="AppHeaderBar variant: compact">
            <div className="app-nav-preview">
              <AppHeaderBar variant="compact" />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="app-sidebar-shell"
        title="AppSidebarShell"
        description="Composed workspace shell with collapsible sidebar, header row, and main content zone."
      >
        <DemoMatrix title="AppSidebarShell variants" singleColumn>
          <DemoItem label="AppSidebarShell variant: standard">
            <div className="app-pattern-shell-demo">
              <AppSidebarShell />
            </div>
          </DemoItem>
          <DemoItem label="AppSidebarShell variant: compact">
            <div className="app-pattern-shell-demo">
              <AppSidebarShell variant="compact" defaultCollapsed />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="page-header-actions"
        title="PageHeaderActions"
        description="Page heading block with status badge and primary/secondary action controls."
      >
        <DemoMatrix title="PageHeaderActions variants" singleColumn>
          <DemoItem label="PageHeaderActions variant: standard">
            <PageHeaderActions />
          </DemoItem>
          <DemoItem label="PageHeaderActions variant: compact">
            <PageHeaderActions variant="compact" />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="PageHeaderActions states" singleColumn>
          <DemoItem label="PageHeaderActions state: default">
            <PageHeaderActions state="default" />
          </DemoItem>
          <DemoItem label="PageHeaderActions state: loading">
            <PageHeaderActions state="loading" />
          </DemoItem>
          <DemoItem label="PageHeaderActions state: empty">
            <PageHeaderActions state="empty" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="filter-toolbar"
        title="FilterToolbar"
        description="Filter row composition for search, selects, date controls, and apply/clear actions."
      >
        <DemoMatrix title="FilterToolbar variants" singleColumn>
          <DemoItem label="FilterToolbar variant: standard">
            <FilterToolbar
              searchValue={searchValue}
              statusValue={statusValue}
              onSearchChange={setSearchValue}
              onStatusChange={setStatusValue}
              onApplyFilters={() => undefined}
            />
          </DemoItem>
          <DemoItem label="FilterToolbar variant: compact">
            <FilterToolbar
              variant="compact"
              searchValue={searchValue}
              statusValue={statusValue}
              onSearchChange={setSearchValue}
              onStatusChange={setStatusValue}
              onApplyFilters={() => undefined}
            />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="FilterToolbar states" singleColumn>
          <DemoItem label="FilterToolbar state: default">
            <FilterToolbar state="default" />
          </DemoItem>
          <DemoItem label="FilterToolbar state: loading">
            <FilterToolbar state="loading" />
          </DemoItem>
          <DemoItem label="FilterToolbar state: empty">
            <FilterToolbar state="empty" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="data-table-panel"
        title="DataTablePanel"
        description="Data table shell with summary, action controls, and pagination/empty/loading states."
      >
        <DemoMatrix title="DataTablePanel variants" singleColumn>
          <DemoItem label="DataTablePanel variant: standard">
            <DataTablePanel currentPage={tablePage} totalPages={6} onPageChange={setTablePage} />
          </DemoItem>
          <DemoItem label="DataTablePanel variant: compact">
            <DataTablePanel variant="compact" currentPage={tablePage} totalPages={6} onPageChange={setTablePage} />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="DataTablePanel states" singleColumn>
          <DemoItem label="DataTablePanel state: default">
            <DataTablePanel state="default" currentPage={1} totalPages={3} onPageChange={() => undefined} />
          </DemoItem>
          <DemoItem label="DataTablePanel state: loading">
            <DataTablePanel state="loading" currentPage={1} totalPages={3} onPageChange={() => undefined} />
          </DemoItem>
          <DemoItem label="DataTablePanel state: empty">
            <DataTablePanel state="empty" rows={[]} currentPage={1} totalPages={1} onPageChange={() => undefined} />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="empty-state-panel"
        title="EmptyStatePanel"
        description="Empty-state panel with icon, supporting copy, and two action slots."
      >
        <DemoMatrix title="EmptyStatePanel variants" singleColumn>
          <DemoItem label="EmptyStatePanel variant: standard">
            <EmptyStatePanel title="No transaction history" description="Import transactions to start reconciliation." />
          </DemoItem>
          <DemoItem label="EmptyStatePanel variant: compact">
            <EmptyStatePanel
              variant="compact"
              title="No active workspace"
              description="Create or join a workspace to continue."
            />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="EmptyStatePanel states" singleColumn>
          <DemoItem label="EmptyStatePanel state: default">
            <EmptyStatePanel state="default" />
          </DemoItem>
          <DemoItem label="EmptyStatePanel state: loading">
            <EmptyStatePanel state="loading" />
          </DemoItem>
          <DemoItem label="EmptyStatePanel state: empty">
            <EmptyStatePanel state="empty" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="error-state-panel"
        title="ErrorStatePanel"
        description="Error panel for failed operations with retry and optional support escalation."
      >
        <DemoMatrix title="ErrorStatePanel variants" singleColumn>
          <DemoItem label="ErrorStatePanel variant: standard">
            <ErrorStatePanel />
          </DemoItem>
          <DemoItem label="ErrorStatePanel variant: compact">
            <ErrorStatePanel variant="compact" />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="ErrorStatePanel states" singleColumn>
          <DemoItem label="ErrorStatePanel state: default">
            <ErrorStatePanel state="default" />
          </DemoItem>
          <DemoItem label="ErrorStatePanel state: loading">
            <ErrorStatePanel state="loading" />
          </DemoItem>
          <DemoItem label="ErrorStatePanel state: error">
            <ErrorStatePanel state="error" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="settings-form-card"
        title="SettingsFormCard"
        description="Sectioned settings card with save/cancel actions and validation-ready form state coverage."
      >
        <DemoMatrix title="SettingsFormCard variants" singleColumn>
          <DemoItem label="SettingsFormCard variant: standard">
            <div className="app-pattern-form-wide">
              <SettingsFormCard onSubmit={() => undefined} />
            </div>
          </DemoItem>
          <DemoItem label="SettingsFormCard variant: compact">
            <div className="app-pattern-form-wide">
              <SettingsFormCard variant="compact" onSubmit={() => undefined} />
            </div>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="SettingsFormCard states" singleColumn>
          <DemoItem label="SettingsFormCard state: default">
            <div className="app-pattern-form-wide">
              <SettingsFormCard state="default" onSubmit={() => undefined} />
            </div>
          </DemoItem>
          <DemoItem label="SettingsFormCard state: loading">
            <div className="app-pattern-form-wide">
              <SettingsFormCard state="loading" onSubmit={() => undefined} />
            </div>
          </DemoItem>
          <DemoItem label="SettingsFormCard state: error">
            <div className="app-pattern-form-wide">
              <SettingsFormCard state="error" onSubmit={() => undefined} />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="billing-plan-card"
        title="BillingPlanCard"
        description="Billing summary card with plan status, feature list, and manage/upgrade actions."
      >
        <DemoMatrix title="BillingPlanCard variants" singleColumn>
          <DemoItem label="BillingPlanCard variant: standard">
            <BillingPlanCard />
          </DemoItem>
          <DemoItem label="BillingPlanCard variant: compact">
            <BillingPlanCard variant="compact" />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="BillingPlanCard states" singleColumn>
          <DemoItem label="BillingPlanCard state: default">
            <BillingPlanCard state="default" />
          </DemoItem>
          <DemoItem label="BillingPlanCard state: loading">
            <BillingPlanCard state="loading" />
          </DemoItem>
          <DemoItem label="BillingPlanCard state: empty">
            <BillingPlanCard state="empty" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="profile-summary-card"
        title="ProfileSummaryCard"
        description="Identity summary card with avatar, role badge, metadata rows, and edit action."
      >
        <DemoMatrix title="ProfileSummaryCard variants" singleColumn>
          <DemoItem label="ProfileSummaryCard variant: standard">
            <ProfileSummaryCard />
          </DemoItem>
          <DemoItem label="ProfileSummaryCard variant: compact">
            <ProfileSummaryCard variant="compact" />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="ProfileSummaryCard states" singleColumn>
          <DemoItem label="ProfileSummaryCard state: default">
            <ProfileSummaryCard state="default" />
          </DemoItem>
          <DemoItem label="ProfileSummaryCard state: loading">
            <ProfileSummaryCard state="loading" />
          </DemoItem>
          <DemoItem label="ProfileSummaryCard state: empty">
            <ProfileSummaryCard state="empty" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}