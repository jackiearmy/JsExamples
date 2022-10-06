let addd: number = 22;
const url: string = "https://api.thecatapi.com/v1/images/search";
const button: HTMLButtonElement | null = document.querySelector("button");
const tableBody: HTMLTableElement | null = document.querySelector("#table-body");

interface CatType {
    id: string;
    url: string;
    height: number;
    width: number;
}

class Cat implements CatType {
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id: string, url: string, height: number, width: number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    public static addRow(data: CatType): void {
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow: HTMLTableRowElement = document.createElement("tr");
        tableRow.innerHTML = `<td>${data.id}</td>
        <td><img src="${data.url}" /></td>
        <td>高度${data.height.toString()}</td>
        <td>宽度${data.width.toString()}</td>
        <td>地址${data.url}</td>
        <td><a href="#">X</a></td>`;
        tableBody?.appendChild(tableRow);
    }

    public static deleteRow(target: HTMLAnchorElement): void {
        const td = target.parentElement as HTMLTableCellElement;
        const tr = td?.parentElement as HTMLTableRowElement;
        tr?.remove();
    }
}

async function GetJson<T>(url: string) {
    const response: Response = await fetch(url);
    const json: Promise<T> = await response.json();
    return json
}

async function GetData() {
    try {
        const json: CatType[] = await GetJson<CatType[]>(url);
        const data: CatType = json[0];
        WebDisplay.addRow(data);
    } catch (error: Error | unknown) {
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        console.log(message);
    }
}

button?.addEventListener<"click">("click", GetData);

tableBody?.addEventListener<"click">("click", (event) => {
    WebDisplay.deleteRow(<HTMLAnchorElement>event.target);
});