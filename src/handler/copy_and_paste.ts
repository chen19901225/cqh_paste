
import * as vscode from "vscode";
import * as os from "os";

export function cqh_copy(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    if (textEditor.selection.isEmpty) {
        // no selection
        return;
    }
    // has selection
    let selection = textEditor.selections[0]
    // case: for the first line, select only content, without indent
    let new_selection = new vscode.Selection(
        new vscode.Position(selection.start.line, 0),
        selection.end
    )
    let text = textEditor.document.getText(new_selection) || ""
    if (text.length > 0) {
        // write content to clipboard
        vscode.env.clipboard.writeText(text)
    }


}
export async function cqh_paste(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const position = textEditor.selection.active;
    let col = position.character;
    let getTextIndent = (line: string): number => {
        let index = 0;
        for (index = 0; index < line.length; index++) {
            if (line[index] != " ") {
                return index;
            }
        }
        return index;

    }
    let text = await vscode.env.clipboard.readText();
    let lines: Array<string> = text.split(/\r?\n/)
    let newLines: string[] = [];
    let minIndent = getTextIndent(lines[0]);
    let index = 0
    for (let line of lines) {
        // replace tab with whitespace *4
        line = line.replace(/\t/, "    ");
        newLines.push(line);
        if (index == 0) {
            // only get the first line indent
            minIndent = Math.min(getTextIndent(line), minIndent);
        }

        index += 1
    }
    let convertLines: string[] = []
    index = 0;
    for (let line of newLines) {
        convertLines.push(line.slice(minIndent))
        index = index + 1
    }

    let insertText = convertLines.join(os.EOL)
    let activeEditor = vscode.window.activeTextEditor!;

    activeEditor.insertSnippet(new vscode.SnippetString(insertText), position);

    /*
    vscode.env.clipboard.readText().then((text: string) => {
        let lines: Array<string> = text.split(/\r?\n/)
        let newLines: string[] = [];
        let minIndent = col;
        let index = 0
        for (let line of lines) {
            // replace tab with whitespace *4
            line = line.replace(/\t/, "    ");
            newLines.push(line);
            if(index == 0) {
                // only get the first line indent
                minIndent = Math.min(getTextIndent(line), minIndent);
            }

            index += 1
        }
        let convertLines: string[] = []
        index = 0;
        for(let line of newLines) {
            if(index === 0) {
                // for first line
                convertLines.push(line.slice(minIndent, 0))

            }  else {
                // not the first line
                convertLines.push(" ".repeat(col), line.slice(minIndent, 0))
            }
            index = index +1
        }

        let insertText = convertLines.join(os.EOL)
        let activeEditor = vscode.window.activeTextEditor!;

        activeEditor.insertSnippet(new vscode.SnippetString(insertText), position);

    });
    */


}