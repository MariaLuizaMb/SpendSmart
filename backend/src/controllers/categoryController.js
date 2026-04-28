import CategoryService from "../services/categoryService.js";

class CategoryController {
  static async listar(req, res, next) {
    try {
      const categorias = await CategoryService.listarPorUsuario(req.usuario.id);

      res.status(200).json({
        success: true,
        data: categorias,
      });
    } catch (error) {
      next(error);
    }
  }

  static async cadastrar(req, res, next) {
    try {
      const categoria = await CategoryService.cadastrarPersonalizada({
        idUsuario: req.usuario.id,
        nome: req.body.nome,
        tipo: req.body.tipo,
      });

      res.status(201).json({
        success: true,
        message: "Categoria salva com sucesso.",
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editar(req, res, next) {
    try {
      const { id } = req.params;
      const dados = req.body;

      const categoriaAtualizada = await CategoryService.editar(
        id,
        req.usuario.id,
        dados
      );

      res.status(200).json({
        success: true,
        message: "Categoria atualizada com sucesso.",
        data: categoriaAtualizada,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remover(req, res, next) {
    try {
      const { id } = req.params;

      const resultado = await CategoryService.remover(id, req.usuario.id);

      res.status(200).json({
        success: true,
        message: "Categoria removida com sucesso.",
        data: resultado,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
