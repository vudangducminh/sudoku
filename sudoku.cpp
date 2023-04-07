#include <bits/stdc++.h>
using namespace std;
// #define int long long

int t, n, m, k, cnt = 1e5, A[10][10], mod = 1e9 + 7;
bool VST[10][10], S[10][10][10];
mt19937_64 rng;
string str[10];

void fill(bool s[10][10][10], bool vst[10][10], int a[10][10]){
    // for(int ii = 1; ii <= 9; ii++){
    //     for(int jj = 1; jj <= 9; jj++){   
    //         cout << a[ii][jj] <<" ";
    //     }
    //     cout << "\n";
    // }
    // cout << "\n";
    for(int o = 1; o <= 1000; o++){

        // for(int i = 1; i <= 9; i++){
        //     for(int j = 1; j <= 9; j++){
        //         cout << a[i][j] <<" ";
        //     }
        //     cout << "\n";
        // }
        // cout << "\n";
        // cout << "\n"; 

        // for(int i = 1; i <= 9; i++){
        //     for(int j = 1; j <= 9; j++){
        //         int sum = 0;
        //         for(int k = 1; k <= 9; k++){
        //             if(!s[i][j][k]) sum++;
        //         }
        //         cout << sum <<" ";
        //     }
        //     cout << "\n";
        // }
        // cout << "\n";
        // cout << "\n"; 

        bool flag = 0, check = 0;
        for(int i = 1; i <= 9; i++){
            for(int j = 1; j <= 9; j++){ 
                int osu = 0; 
                // for(int ii = 1; ii <= 9; ii++){
                //     for(int jj = 1; jj <= 9; jj++){
                //         cout << a[ii][jj] <<" ";
                //     }
                //     cout << "\n";
                // }
                // cout << "\n";
                // for(int ii = 1; ii <= 9; ii++){
                //     for(int jj = 1; jj <= 9; jj++){
                //         int sum = 0;
                //         for(int kk = 1; kk <= 9; kk++){
                //             if(!s[ii][jj][kk]) sum++;
                //         }
                //         cout << sum <<" ";
                //     }
                //     cout << "\n";
                // }
                // cout << "\n";
                // cout << "\n";  
                for(int k = 1; k <= 9; k++){
                    if(!s[i][j][k]) osu++;
                } 
                if(osu == 0 && !a[i][j]){
                    // cout << i <<" "<< j <<" "<< a[i][j] << "\n";
                    // for(int k = 1; k <= 9; k++) cout << s[i][j][k] <<" ";
                    return;
                }
                if(!a[i][j]){ 
                    flag = 1;
                    if(osu == 1){
                        for(int k = 1; k <= 9; k++){
                            if(!s[i][j][k]) a[i][j] = k, s[i][j][k] = 1, check = 1;
                        }
                    }
                }
                if(!vst[i][j] && a[i][j]){
                    check = 1; vst[i][j] = 1;
                    for(int k = 1; k <= 9; k++){
                        s[k][j][a[i][j]] = 1;
                        s[i][k][a[i][j]] = 1;
                        s[i][j][k] = 1; 
                    }
                    int x = ((i - 1) / 3), y = ((j - 1) / 3);
                    for(int k = x * 3 + 1; k <= (x + 1) * 3; k++){
                        for(int l = y * 3 + 1; l <= (y + 1) * 3; l++){
                            s[k][l][a[i][j]] = 1; 
                        }
                    }
                }
            }
        }

        // for(int i = 1; i <= 9; i++){
        //     for(int j = 1; j <= 9; j++){
        //         cout << a[i][j] <<" ";
        //     }
        //     cout << "\n";
        // }
        // cout << "\n";
 
        int dem[10]; 
        for(int i = 0; i <= 2; i++){
            for(int j = 0; j <= 2; j++){
                for(int k = 1; k <= 9; k++) dem[k] = 0;
                for(int l = i * 3 + 1; l <= (i + 1) * 3; l++){
                    for(int r = j * 3 + 1; r <= (j + 1) * 3; r++){
                        if(!a[l][r]){
                            for(int k = 1; k <= 9; k++){
                                if(!s[l][r][k]) dem[k]++;
                            }
                        }
                        else dem[k] -= 100;
                    }
                }
                for(int k = 1; k <= 9; k++){
                    if(dem[k] != 1) continue;
                    bool ch = 0;
                    for(int l = i * 3 + 1; l <= (i + 1) * 3; l++){
                        for(int r = j * 3 + 1; r <= (j + 1) * 3; r++){
                            if(!a[l][r] && s[l][r][k] == 0){
                                vst[l][r] = 1;                               
                                for(int kk = 1; kk <= 9; kk++){
                                    s[kk][r][k] = 1;
                                    s[l][kk][k] = 1;
                                    s[l][r][k] = 1; 
                                }
                                int x = ((l - 1) / 3), y = ((r - 1) / 3);
                                for(int kk = x * 3 + 1; kk <= (x + 1) * 3; kk++){
                                    for(int ll = y * 3 + 1; ll <= (y + 1) * 3; ll++){
                                        s[kk][ll][k] = 1; 
                                    }
                                }
                                a[l][r] = k; ch = 1; check = 1; break;
                            }
                        }
                        if(ch) break;
                    } 
                } 
            } 
        }
        for(int i = 0; i <= 2; i++){
            for(int j = 0; j <= 2; j++){
                for(int k = 1; k <= 9; k++){
                    int sum = 0;
                    for(int ii = i * 3 + 1; ii <= (i + 1) * 3; ii++){
                        for(int jj = j * 3 + 1; jj <= (j + 1) * 3; jj++){
                            if(!s[ii][jj][k]) sum++;
                        }
                    } 
                    if(sum >= 4 || sum == 0) continue;
                    for(int ii = i * 3 + 1; ii <= (i + 1) * 3; ii++){
                        int ch = 0;
                        for(int jj = j * 3 + 1; jj <= (j + 1) * 3; jj++){
                            if(!s[ii][jj][k]) ch++;
                        }
                        if(ch == sum){
                            for(int kk = 1; kk <= 9; kk++){
                                if((kk - 1) / 3 != j){
                                    if(s[ii][kk][k] == 0) check = 1; s[ii][kk][k] = 1; 
                                }
                            }
                        }
                    }
                    for(int jj = j * 3 + 1; jj <= (j + 1) * 3; jj++){
                        int ch = 0;
                        for(int ii = i * 3 + 1; ii <= (i + 1) * 3; ii++){
                            if(!s[ii][jj][k]) ch++;
                        }
                        if(ch == sum){
                            // cout << "OSU" <<" "<< sum <<" "<< i <<" "<< j <<" "<< k << "\n";
                            for(int kk = 1; kk <= 9; kk++){
                                if((kk - 1) / 3 != i){
                                    if(s[kk][jj][k] == 0) check = 1; s[kk][jj][k] = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        // cout << "flag: " << flag <<" "<< o << "\n";
        if(!flag){ 
            for(int i = 1; i <= 21; i++) cout << '_';
            cout << "\n";
            for(int i = 1; i <= 9; i++){
                cout << '|';
                for(int j = 1; j <= 9; j++){
                    cout << a[i][j];
                    if(j % 3 == 0) cout << "|";
                    cout <<" ";
                }
                cout << "\n";
                if(i % 3 == 0){
                    for(int j = 1; j <= 21; j++) cout << '_';
                    cout << "\n";
                }
            }
            // for(int ii = 1; ii <= 9; ii++){
            //     for(int jj = 1; jj <= 9; jj++){
            //         int sum = 0;
            //         for(int kk = 1; kk <= 9; kk++){
            //             if(!s[ii][jj][kk]) sum++;
            //         }
            //         cout << sum <<" ";
            //     }
            //     cout << "\n";
            // }
            // cout << "\n";
            // cout << "\n";  
            exit(0);
        }
        // for(int ii = 1; ii <= 9; ii++){
        //     for(int jj = 1; jj <= 9; jj++){
        //         cout << a[ii][jj] <<" ";
        //     }
        //     cout << "\n";
        // }
        // cout << "\n" << "OSU" << "\n"; 
        if(!check){ 
            // for(int i = 1; i <= 21; i++) cout << '_';
            // cout << "\n";
            // for(int i = 1; i <= 9; i++){
            //     cout << '|';
            //     for(int j = 1; j <= 9; j++){
            //         cout << a[i][j];
            //         if(j % 3 == 0) cout << "|";
            //         cout <<" ";
            //     }
            //     cout << "\n";
            //     if(i % 3 == 0){
            //         for(int j = 1; j <= 21; j++) cout << '_';
            //         cout << "\n";
            //     }
            // }
            // exit(0);
            for(int cnt = 7; cnt >= 6; cnt--){
                for(int i = 1; i <= 9; i++){
                    for(int j = 1; j <= 9; j++){ 
                        if(!a[i][j]){ 
                            int counting = 0;
                            for(int k = 1; k <= 9; k++) counting += s[i][j][k];
                            if(counting == 9) return;
                            if(counting == cnt){
                                // for(int ii = 1; ii <= 9; ii++){
                                //     for(int jj = 1; jj <= 9; jj++){
                                //         cout << a[ii][jj] <<" ";
                                //     }
                                //     cout << "\n";
                                // }
                                // cout << "\n" << "old" << "\n";
                                int AA[10][10]; bool VSTT[10][10], SS[10][10][10];
                                for(int k = 1; k <= 9; k++){  
                                    if(!s[i][j][k]){
                                        for(int ii = 1; ii <= 9; ii++){
                                            for(int jj = 1; jj <= 9; jj++){
                                                AA[ii][jj] = a[ii][jj]; 
                                                VSTT[ii][jj] = vst[ii][jj];  
                                                for(int kk = 1; kk <= 9; kk++) SS[ii][jj][kk] = s[ii][jj][kk];
                                            }
                                            // cout << "\n";
                                        } 
                                        a[i][j] = k;
                                        // for(int ii = 1; ii <= 9; ii++){
                                        //     for(int jj = 1; jj <= 9; jj++){
                                        //         cout << a[ii][jj] <<" ";
                                        //     }
                                        //     cout << "\n";
                                        // }
                                        // cout << "\n" << "new" << "\n"; 
                                        fill(s, vst, a); 
                                        for(int ii = 1; ii <= 9; ii++){
                                            for(int jj = 1; jj <= 9; jj++){
                                                a[ii][jj] = AA[ii][jj]; 
                                                vst[ii][jj] = VSTT[ii][jj];
                                                for(int kk = 1; kk <= 9; kk++) s[ii][jj][kk] = SS[ii][jj][kk];
                                            } 
                                        } 
                                    }
                                } 
                            }
                        }
                    }
                }
            }
            break;
        } 
    }
}

void solve(){   
    fill(S, VST, A);
}

signed main(){
    ios_base::sync_with_stdio(NULL); cin.tie(nullptr); cout.tie(nullptr);
    // rng.seed((int)main ^ time(0));
    #ifdef Kawaii
        auto starttime = chrono::high_resolution_clock::now();
    #endif

    for(int i = 1; i <= 9; i++) cin >> str[i];
    for(int i = 1; i <= 9; i++){
        for(int j = 1; j <= 9; j++){
            A[i][j] = str[i][j - 1] - 48; 
            if(A[i][j]){
                for(int k = 1; k <= 9; k++) S[i][j][k] = 1; 
            } 
        }
    }
    solve();

    #ifdef Kawaii
        auto endtime = chrono::high_resolution_clock::now();
        auto duration = chrono::duration_cast<chrono::milliseconds>(endtime - starttime).count(); 
        cout << "\n=====" << "\nUsed: " << duration << " ms\n";
    #endif
}
