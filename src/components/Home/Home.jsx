import React, { useState } from "react"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from 'react-modal';
import Footer from "../Footer/Footer";

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false); // Estado para o modal de sucesso

    // Definindo o esquema de validação usando Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string()
            .required("E-mail é obrigatório")
            .email("E-mail inválido"),
        telefone: Yup.string().required("Telefone é obrigatório"),
        cargo: Yup.string().required("Cargo pretendido é obrigatório"),
        linkedin: Yup.string(), // Adicionando campos opcionais sem validação
        github: Yup.string(), // Adicionando campos opcionais sem validação
    });

    // Função de manipulação do envio do formulário
    const handleSubmit = (values, { setErrors }) => {
        console.log("Formulário enviado com os seguintes dados:", values);
        const errors = Object.keys(values).filter(key => {
            const error = validationSchema.fields[key].validateSync(values[key], { abortEarly: false });
            return error && error.message;
        });

        if (errors.length > 0) {
            setModalMessage(errors.map(error => validationSchema.fields[error].validateSync(values[error]).message).join(", "));
            setModalIsOpen(true);
        } else {
            // Se não houver erros, exibir modal de sucesso
            setModalMessage("Cadastro efetuado com sucesso!"); // Mensagem de sucesso
            setSuccessModalIsOpen(true); // Abre o modal exibindo que o cadastro foi realizado com sucesso
        }
    };

    return (
        <div className="bg-purple-800 text-center p-4 min-h-screen">
            <h1 className="text-white text-3xl">Formulário de Cadastro para Membros</h1>
            <h2 className="text-white text-xl">Frontend Fusion 🚀</h2>
        
            <main className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
                <Formik
                    initialValues={{ name: "", email: "", telefone: "", cargo: "", linkedin: "", github: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="mb-6 flex items-center relative">
                            <img src="/User.png" alt="Ícone de Usuário" className="absolute left-3" />
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2 pl-10"
                                placeholder="Nome"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6 flex items-center relative">
                            <img src="/Email.png" alt="Ícone de E-mail" className="absolute left-3" />
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2 pl-10"
                                placeholder="E-mail"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6 flex items-center relative">
                            <img src="/Phone.png" alt="Ícone de Telefone" className="absolute left-3" />
                            <Field
                                type="text"
                                id="telefone"
                                name="telefone"
                                className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2 pl-10"
                                placeholder="Telefone"
                            />
                            <ErrorMessage name="telefone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6">
                            <Field as="select" id="cargo" name="cargo" className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2">
                                <option value="">
                                    Selecione o cargo
                                </option>
                                <option value="frontend">Desenvolvedor Frontend</option>
                                <option value="backend">Desenvolvedor Backend</option>
                                <option value="fullstack">Desenvolvedor Full Stack</option>
                                <option value="mobile">Desenvolvedor Mobile</option>
                                <option value="desenvolvedor-software">Desenvolvedor de Software</option>
                                <option value="engenheiro-software">Engenheiro de Software</option>
                                <option value="arquiteto-software">Arquiteto de Software</option>
                                <option value="ui-ux-designer">UI/UX Designer</option>
                                <option value="analista-sistemas">Analista de Sistemas</option>
                                <option value="analista-programador">Analista Programador</option>
                                <option value="devops-engineer">DevOps Engineer</option>
                                <option value="engenheiro-dados">Engenheiro de Dados</option>
                                <option value="qa-engineer">QA Engineer</option>
                                <option value="scrum-master">Scrum Master</option>
                                <option value="product-owner">Product Owner</option>
                            </Field>
                            <ErrorMessage name="cargo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-6 flex items-center relative">
                            <img src="/LinkedIn.png" alt="Ícone do LinkedIn" className="absolute left-3" />
                            <Field
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2 pl-10"
                                placeholder="LinkedIn (opcional)"
                            />
                        </div>

                        <div className="mb-6 flex items-center relative">
                            <img src="/GitHub.png" alt="Ícone do GitHub" className="absolute left-3" />
                            <Field
                                type="text"
                                id="github"
                                name="github"
                                className="border-b border-purple-800 focus:outline-none focus:border-purple-800 w-full py-2 pl-10"
                                placeholder="GitHub (opcional)"
                            />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </Form>
                </Formik>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="bg-white p-4 rounded shadow-md max-w-sm mx-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <h2 className="text-red-500 text-lg">Erros no Formulário</h2>
                    <p className="mt-2">{modalMessage}</p>
                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    >
                        Fechar
                    </button>
                </Modal>

                <Modal
                    isOpen={successModalIsOpen}
                    onRequestClose={() => setSuccessModalIsOpen(false)}
                    className="bg-white p-4 rounded shadow-md max-w-sm mx-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <h2 className="text-purple-500 text-lg">⚠️ Aviso</h2>
                    <p className="mt-2">{modalMessage}</p>
                    <button
                        onClick={() => setSuccessModalIsOpen(false)}
                        className="mt-4 bg-purple-600 text-white p-2 rounded text-center hover:bg-purple-700"
                    >
                        Fechar
                    </button>
                </Modal>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
