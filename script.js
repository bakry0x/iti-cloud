fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    })
    .then(users => {
        const tabsContainer = document.getElementById('tabs');
        const contentContainer = document.getElementById('content');

        async function displayUserPosts(id) {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user posts');
                }
                const posts = await response.json();

                const titles = posts.map(post => post.title);
                contentContainer.innerHTML = titles.map(title => `<p class="post-title">${title}</p>`).join('');
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        users.forEach(user => {
            const tab = document.createElement('button');
            tab.textContent = user.name;
            tab.classList.add('tab');
            tab.addEventListener('click', () => displayUserPosts(user.id));

            tabsContainer.appendChild(tab);
        });
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
