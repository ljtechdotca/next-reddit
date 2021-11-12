import fs from "fs";
import path from "path";

const name = process.argv[2];
const componentFolder = path.resolve(".", "components", name.toLowerCase());
const indexPath = path.resolve(".", "components", "index.ts");
const componentPath = path.resolve(componentFolder, `${name}.tsx`);
const stylePath = path.resolve(componentFolder, `${name}.module.scss`);

fs.mkdirSync(componentFolder);

fs.writeFileSync(
  componentPath,
  `import styles from "./${name}.module.scss";
  export interface ${name}Props {}
  
  export const ${name} = ({}: ${name}Props) => {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          todo: new component ${name}
        </div>
      </div>
    );
  }`
);

fs.writeFileSync(
  stylePath,
  `.root {
  }
  
.container {
  
}`
);

const indexContent = [
  ...Array.from(
    new Set(
      fs
        .readFileSync(indexPath, "utf8")
        .split("\n")
        .map((_) => _.trim())
        .filter(Boolean)
    ).keys()
  ),
  `export * from "./${name.toLowerCase()}/${name}";`,
]
  .sort((a, b) => a.localeCompare(b))
  .join("\n");

fs.writeFileSync(indexPath, indexContent);
