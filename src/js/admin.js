let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Engineering",
        status: "Available"
    },
    {
        id: 2,
        title: "Introduction to Algorithms",
        author: "Clifford Stein",
        category: "Software Engineering",
        status: "Available"
    },
    {
        id: 3,
        title: "Cyber Security And Data protection",
        author: "Ronald L.Rivest",
        category: "Cyber Security",
        status: "Available"
    }
];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function loadCharts() {

    // months chart
    const ctx1 = document.getElementById("monthlyChart");

    if (ctx1) {
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Books Borrowed",
                    data: [120, 190, 300, 250, 220, 310],
                    borderWidth: 2
                }]
            }
        });
    }

    // categories chart
    const ctx2 = document.getElementById("categoryChart");

    if (ctx2) {

        const categories = {};

        books.forEach(book => {
            categories[book.category] = (categories[book.category] || 0) + 1;
        });

        console.log(categories);
        const values = Object.values(categories);


        new Chart(ctx2, {
            type: "pie",
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        "#4CAF50",
                        "#2196F3",
                        "#FF9800",
                        "#E91E63",
                        "#9C27B0"
                    ]
                }]
            },
            plugins: [ChartDataLabels],

            options: {
                plugins: {
                    datalabels: {
                        color: "#fff",
                        font: {
                            weight: "bold",
                            size: 14
                        },

                        formatter: (value, context) => {
                            let total = context.chart.data.datasets[0].data
                                .reduce((a, b) => a + b, 0);

                            let percentage = (value / total * 100).toFixed(1) + "%";

                            return percentage;
                        }
                    }
                }
            }
        });

    }
}
window.onload = function () {
    loadCharts();
};
