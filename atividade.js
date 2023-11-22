class ORM{
  constructor() {
    throw new Error("A classe pai não pode ser instanciada diretamente.")
  }

  static validarDados(dados) {
    if (typeof dados !== "object") {
      throw new Error("Os dados devem ser um objeto.")
    }
    if (!dados.id || typeof dados.id !== "number") {
      throw new Error("Os dados devem conter um campo 'id' numérico.")
    }
  }

  static criar(dados) {
    this.dados ||= []
    this.validarDados(dados)
    this.dados.push(dados)
  }

  static ler(id) {
    const item = this.dados.find(item => item.id === id);
    if (item === undefined) {
      return console.log(`Item com ID ${id} não encontrado.`);
      // Retorna null ou outra valor apropriado se o item não for encontrado
    }
    return item; // Retorna o item encontrado
  }


  static atualizar(id, novosDados) {
    this.dados ||= []
    const itemExistente = this.dados.find(item => item.id === id)

    if (itemExistente) {
      if (novosDados.nome && novosDados.nome.length >= 3) {
        itemExistente.nome = novosDados.nome
      } else {
        throw new Error("O campo 'nome' deve ter no mínimo 3 caracteres para atualizar.")
      }
    } else {
      throw new Error("Item com ID não encontrado: " + id)
    }
  }

  static excluir(id) {
    this.dados ||= []
    const itemParaExcluir = this.dados.find(item => item.id === id)

    if (itemParaExcluir) {
      this.dados = this.dados.filter(item => item.id !== id)
    } else {
      console.log(`Item com ID ${id} não encontrado. Nenhuma exclusão foi realizada.`)
    }
  }

  static listarTodos() {
    this.dados ||= []
    return this.dados
  }
}

class ModeloFilho extends ORM {
  static dados = []
}

ModeloFilho.criar({ id: 1, nome: "Item 1" })
ModeloFilho.criar({ id: 2, nome: "Item 2" })

console.table(ModeloFilho.listarTodos())

console.table(ModeloFilho.ler(1))

ModeloFilho.atualizar(2, { nome: "Item 2 Atualizado" })
console.table(ModeloFilho.ler(2))

ModeloFilho.excluir(1)
ModeloFilho.ler(1)
console.table(ModeloFilho.listarTodos())