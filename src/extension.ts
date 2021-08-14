// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { cqh_copy, cqh_paste } from './handler/copy_and_paste';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cqh-paste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('cqh-paste.copy', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from cqh_paste!');
		cqh_copy(textEditor, edit)
	});

	context.subscriptions.push(disposable);

	let pasteDisposable = vscode.commands.registerTextEditorCommand("cqh-paste.copy", (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		cqh_paste(textEditor, edit)
	})
	context.subscriptions.push(pasteDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
