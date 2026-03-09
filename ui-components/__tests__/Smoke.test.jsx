import { render, screen } from "@testing-library/react";
import Badge from "../typography/Badge/Badge";
import Heading from "../typography/Heading/Heading";
import UiLink from "../typography/Link/Link";
import Text from "../typography/Text/Text";
import Card from "../layout/Card/Card";
import Container from "../layout/Container/Container";
import Grid from "../layout/Grid/Grid";
import Stack from "../layout/Stack/Stack";
import Breadcrumb from "../navigation/Breadcrumb/Breadcrumb";
import Navbar from "../navigation/Navbar/Navbar";
import Sidebar from "../navigation/Sidebar/Sidebar";
import Spinner from "../feedback/Spinner/Spinner";

describe("Smoke render", () => {
  it("renders remaining components without crashing", () => {
    render(
      <Container>
        <Navbar brand="Brand" items={[{ label: "Home", href: "#" }]} />
        <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Current", current: true }]} />
        <Grid columns={2}>
          <Card header="Header" footer="Footer">
            <Stack>
              <Heading>Heading</Heading>
              <Text>Body text</Text>
              <Badge>New</Badge>
              <UiLink href="#">Link</UiLink>
              <Spinner inline />
            </Stack>
          </Card>
          <Sidebar title="Menu" items={[{ label: "Item", href: "#" }]} />
        </Grid>
      </Container>,
    );

    expect(screen.getByText(/heading/i)).toBeInTheDocument();
    expect(screen.getByText(/item/i)).toBeInTheDocument();
  });
});

