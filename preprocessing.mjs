import fs from "node:fs";

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const envs = Object.entries(process.env).filter(([key]) =>
    key.startsWith("REACT_APP")
  );
  if (envs.length === 0) return;

  const dir = "static/js";
  const file = fs
    .readdirSync(dir)
    .find((it) => it.match(/main\.[0-9a-z]{8}\.js$/));
  if (file === undefined) return;

  const content =
    envs.reduce((acc, it) => {
      acc += `window.${it[0]}="${it[1]}";`;
      return acc;
    }, ";") + fs.readFileSync(`${dir}/${file}`).toString();

  fs.writeFileSync(`${dir}/${file}`, content);
}
