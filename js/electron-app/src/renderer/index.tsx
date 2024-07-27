import ReactDOM from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import App from '@diagnosis-report-generator/react-app/App'
import Index from '@diagnosis-report-generator/react-app/index'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />);

postMessage({ payload: 'removeLoading' }, '*');
