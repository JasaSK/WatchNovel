const API_URL = "https://6a0ea5151736097c360a3666.mockapi.io/tb_book";

export const getBooks = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const addBook = async (book) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    return await response.json();
};

export const updateBook = async (id, book) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });

    return await response.json();
};

export const deleteBook = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    return await response.json();
};