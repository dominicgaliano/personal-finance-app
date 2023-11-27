<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { auth } from "../../stores/auth";

    onMount(() => {
        auth.subscribe((user) => {
            if (user) {
                goto("/");
            }
        });
    });

    let email = "";
    let emailError = false;

    let password = "";
    let passwordError = false;

    function validateInputs(email: string, password: string) {
        // TODO: implement more validation and error handling
        if (email.length < 1) {
            emailError = true;
            return false;
        }
        if (password.length < 1) {
            passwordError = true;
            return false;
        }
        return true;
    }

    $: userInputValid = validateInputs(email, password);

    async function handleSubmit(this: HTMLFormElement, event: unknown): Promise<void> {
        // TODO: handle form submission here
        alert("Not implemented yet");
    }
</script>

<div class="wrapper">
    <main>
        <h1 class="centered">Login</h1>
        <form method="POST" on:submit|preventDefault={handleSubmit}>
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                aria-invalid={emailError}
                aria-describedby={emailError ? "email-error" : null}
                autocomplete="email"
                bind:value={email}
            />
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                aria-invalid={passwordError}
                aria-describedby={passwordError ? "password-error" : null}
                autocomplete="new-password"
                bind:value={password}
            />
            <button type="submit" disabled={!userInputValid}>Login</button>
        </form>
    </main>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    main {
        height: fit-content;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .centered {
        text-align: center;
    }
    form > * {
        display: block;
        margin: 1rem;
    }
</style>
