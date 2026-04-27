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
}

export default CategoryController;
