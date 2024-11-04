export function productDto(productData) {
    const { title, description, code, price, stock, category, thumbnails } = productData;

    if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        console.log("Todos los campos son requeridos");
        throw new Error("Todos los campos son requeridos");
    }
    const product = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails || [],
    };

    return product;
}

export function fiterCategoryDto(query) {
    let result;
    if (query === undefined) {
        result = {};
    } else {
        result = { category: query };
    }
    return result;
}

export function paginateOptionsDto(limit, page, sort) {
    // Convertir el valor de sort en el formato correcto para Mongoose
    let sortOption = {};

    if (sort === "asc") {
        sortOption = { price: 1 };
    } else if (sort === "desc") {
        sortOption = { price: -1 };
    }

    // Pasar el sortOption dentro de las opciones de paginación

    const options = {
        limit: limit,
        page: page,
    };
    options.sort = sortOption;
    return options;
}


