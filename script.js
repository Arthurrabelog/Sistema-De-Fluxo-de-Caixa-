document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transaction-form");
    const tableBody = document.getElementById("transaction-list");
    const totalReceitas = document.getElementById("total-receitas");
    const totalDespesas = document.getElementById("total-despesas");
    const saldoTotal = document.getElementById("saldo-total");
    
    let transactions = [];
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const descricao = document.getElementById("descricao").value;
        let valor = document.getElementById("valor").value;  // Pegando o valor como string
        valor = parseFloat(valor);  // Convertendo para número
        
        const tipo = document.getElementById("tipo").value;
        
        // Verificando se a descrição está vazia ou o valor não é um número válido
        if (!descricao || isNaN(valor) || valor <= 0) {
            alert("Por favor, preencha todos os campos corretamente! O valor deve ser um número válido.");
            return;
        }
        
        const transaction = {
            descricao,
            valor,
            tipo,
            data: new Date().toLocaleDateString("pt-BR")
        };
        
        transactions.push(transaction);
        updateTable();
        updateSummary();
        form.reset();
    });
    
    function updateTable() {
        tableBody.innerHTML = "";
        transactions.forEach((transacao, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transacao.descricao}</td>
                <td>R$ ${transacao.valor.toFixed(2)}</td>
                <td>${transacao.tipo === "entrada" ? "Receita" : "Despesa"}</td>
                <td>${transacao.data}</td>
                <td><button class="delete-btn" data-index="${index}">X</button></td>
            `;
            tableBody.appendChild(row);
        });
        
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                transactions.splice(index, 1); // Remove the transaction
                updateTable();
                updateSummary();
            });
        });
    }
    
    function updateSummary() {
        let receitas = transactions.filter(t => t.tipo === "entrada").reduce((acc, t) => acc + t.valor, 0);
        let despesas = transactions.filter(t => t.tipo === "saida").reduce((acc, t) => acc + t.valor, 0);
        let saldo = receitas - despesas;
        
        totalReceitas.innerText = `R$ ${receitas.toFixed(2)}`;
        totalDespesas.innerText = `R$ ${despesas.toFixed(2)}`;
        saldoTotal.innerText = `R$ ${saldo.toFixed(2)}`;
    }
});
