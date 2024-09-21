import { createHashRouter, redirect } from "react-router-dom";
import Session from "./session/index"
import MainPalyerPage from "./session/MainPalyerPage"
import MainAdminPage from "./session/MainAdminPage"
import SignIn from "./SignInPage";
import PlayerRegister from "./PlayerRegister";
import ResultsPage from "./session/ResultsPage";
import AdminLayout from "../layouts/AdminLayout";
import LivaPage from "./session/LivaPage";
import { GetSongsQuery, LiveSong } from "../api/songApi";



const router = createHashRouter([
  {
    path: '/',
    element: <Session />,

    children: [
      {
        path: "/",
        element: <MainPalyerPage />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <MainAdminPage />,
          },
          {
            path: "/admin/results",
            element: <ResultsPage />,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const searchTerm = url.searchParams.get("query");

              const songs = await GetSongsQuery(searchTerm);
              if (!songs?.ok) {
                return [];
              }
              return songs.data;
            },
          }
        ]
      },
      {
        path: "/live/:songId",
        element: <LivaPage />,
        loader: async ({ params }) => {
          const { songId } = params;
          const song = await LiveSong(songId);
          console.log('song', song)
          if (!song?.ok) {
            redirect('/')
          }
          return song.data[0];
          i
        }
      }
    ]

  },

  {

    path: "/login",
    element: <SignIn />,

  }, {

    path: "/register/:role",
    element: <PlayerRegister />,

  },
]);

export default router