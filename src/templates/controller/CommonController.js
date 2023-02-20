class CommonController {
  constructor(model){
    this.model = model;
    this.instance = model.name.toLowerCase();
  }

  /**
   * Retrieve all items inside the database for a specifed model in JSON format
   * @param {Request} request 
   * @param {Response} response 
   */
  getAll = async (request, response) => {
    try {
      const results = await this.model.findAll();

      response.status(200).json(results);
    } catch (error) {
      response.status(500).end();
      console.log(error)
    }
  }

  /**
   * Send an item for a specified model from the dabase in JSON format
   * @param {Request} request 
   * @param {Response} response 
   */
  getOne = async (request, response) => {
    response.json(request[this.instance]);
  }

  /**
   * Create an item for a specified model into the database and return it.
   * @param {Request} request 
   * @param {Response} response 
   */
  create = async (request, response) => {
    const data = request.body;

    try {
      const client = await this.model.create(data);

      response.status(200).json(client);
    } catch (error) {
      response.status(500).end();
      console.log(error)
    }
  };

  /**
   * Update a specified item into the database and return it.
   * @param {Request} request 
   * @param {Response} response 
   */
  update = async (request, response) => {
    const data = request.body;

    try {
      await request[this.instance].update(data);

      request[this.instance].save();

      response.status(200).json(request[this.instance]);
    } catch (error) {
      response.status(500).end();
      console.log(error)
    }
  }

  /**
   * Delete an item for a specified model from the database. Return the item in JSON format when successfull
   * @param {Request} request 
   * @param {Response} response 
   */
  deleteOne = async (request, response) => {
    try {
      await request[this.instance].destroy();

      response.status(200).json(request[this.instance]);
    } catch (error) {
      response.status(500).end();
      console.log(error)
    }
  }  
}

module.exports = CommonController;
