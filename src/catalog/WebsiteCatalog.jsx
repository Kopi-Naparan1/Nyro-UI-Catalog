import { CatalogGroup, ComponentSection } from "./CatalogParts";
import WebsiteSectionPreview from "./WebsiteSectionPreview";

export default function WebsiteCatalog({ groups }) {
  return (
    <>
      {groups.map((group) => (
        <CatalogGroup key={group.id} id={group.id} title={group.title} description={group.description}>
          {group.items.map((item) => (
            <ComponentSection
              key={item.id}
              id={item.id}
              title={item.label}
              description={item.description}
              guide={item.guide}
              lazy
            >
              <WebsiteSectionPreview item={item} />
            </ComponentSection>
          ))}
        </CatalogGroup>
      ))}
    </>
  );
}
