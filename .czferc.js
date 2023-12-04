const buildCommitMsg = (answers) => {
  const head = `${answers.initials}${answers.ticketNumber} ${answers.type}(${answers.scope}): ${answers.subject}`;
  if (answers.body.trim() !== "") {
    return `${head}\n\n${answers.body}`;
  }
  return head;
};

module.exports = {
  questions() {
    return [
      {
        type: "input",
        name: "initials",
        message: "Your initials:\n",
        validate: (initials) =>
          !initials ? "Initials of commit author's name are required" : true,
        filter: (value) => `[${value}]`,
      },
      {
        type: "input",
        name: "ticketNumber",
        message:
          "Add the issue number(s) related to this commit (blank for no issue):\n",
        filter: (value) => {
            return value ? `[${value}]` : "[NOISSUE]";
        },
      },
      {
        type: "list",
        name: "type",
        message:
          "Select the type of change you're committing (pick the first one that applies):\n",
        choices: [
          {
            name: "docs:     📖  Documentation only changes",
            value: "docs",
          },
          {
            name: "build:    🏗   Changes related to CI, CD, or other tooling",
            value: "build",
          },
          {
            name:
              "test:     🛵  Changes related to tests only (including refactoring of tests)",
            value: "test",
          },
          {
            name:
              "refactor: 🛠   Changes that neither fix a bug nor add a feature in the application",
            value: "refactor",
          },
          {
            name:
              "fix:      🐛  Bug fix, including security fixes in the application",
            value: "fix",
          },
          {
            name: "feat:     ✨  New feature in the application",
            value: "feat",
          },
        ],
      },
      {
        type: "input",
        name: "scope",
        message: "Denote the scope of this change (feature or file name(s)):\n",
        validate: (scope) => (!scope ? "Scope is required" : true),
        filter: (value) => value.replace(/,\s*/g, ", "),
      },
      {
        type: "input",
        name: "subject",
        message: "Write a short, imperative tense description of the change:\n",
        validate: (subject) => (!subject ? "Subject is required" : true),
      },
      {
        type: "editor",
        name: "body",
        message: "Provide a longer description of the change:\n",
      },
      {
        type: "input",
        name: "confirmCommit",
        message: (answers) => {
          const separator =
            "--------------------------------------------------------";
          console.info(
            `\n${separator}\n${buildCommitMsg(answers)}\n${separator}\n`
          );
          return "Press Enter to proceed with the above commit message (ctrl-c to abort)";
        },
      },
    ];
  },
  commitMessage({ answers }) {
    return buildCommitMsg(answers);
  },
};